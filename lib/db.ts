import 'server-only';
import fs from 'node:fs/promises';
import path from 'node:path';
import type { Product, Order, SiteContent, SiteSettings } from '@/types';

// ────────────────────────────────────────────────────────────
// Simple JSON-file "database". Good for a boutique store
// with a single admin. Migration to SQLite/Postgres is trivial
// — all reads/writes go through the helpers below.
// ────────────────────────────────────────────────────────────

const DATA_DIR = path.join(process.cwd(), 'data');
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');
const CONTENT_FILE = path.join(DATA_DIR, 'content.json');
const SETTINGS_FILE = path.join(DATA_DIR, 'settings.json');

// In-memory write lock to avoid concurrent JSON corruption
const locks = new Map<string, Promise<unknown>>();

async function withLock<T>(file: string, fn: () => Promise<T>): Promise<T> {
  const prev = locks.get(file) ?? Promise.resolve();
  const next = prev.then(fn, fn);
  locks.set(file, next);
  try {
    return await next;
  } finally {
    if (locks.get(file) === next) locks.delete(file);
  }
}

async function readJson<T>(file: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(file, 'utf8');
    return JSON.parse(raw) as T;
  } catch (err: any) {
    if (err?.code === 'ENOENT') return fallback;
    throw err;
  }
}

async function writeJson(file: string, value: unknown) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  const tmp = file + '.tmp';
  await fs.writeFile(tmp, JSON.stringify(value, null, 2), 'utf8');
  await fs.rename(tmp, file);
}

// ── Products ──
let productsSeeded = false;

export async function getProducts(): Promise<Product[]> {
  const list = await readJson<Product[] | null>(PRODUCTS_FILE, null);
  if (list && list.length > 0) return list;
  if (productsSeeded) return list ?? [];
  // First run → seed from catalog
  productsSeeded = true;
  const { buildSeedProducts } = await import('@/data/products-seed');
  const seed = buildSeedProducts();
  await writeJson(PRODUCTS_FILE, seed);
  return seed;
}

export async function saveProducts(products: Product[]) {
  return withLock(PRODUCTS_FILE, () => writeJson(PRODUCTS_FILE, products));
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const list = await getProducts();
  return list.find((p) => p.slug === slug) ?? null;
}

export async function getProductById(id: string): Promise<Product | null> {
  const list = await getProducts();
  return list.find((p) => p.id === id) ?? null;
}

export async function upsertProduct(product: Product) {
  return withLock(PRODUCTS_FILE, async () => {
    const list = await readJson<Product[]>(PRODUCTS_FILE, []);
    const i = list.findIndex((p) => p.id === product.id);
    if (i >= 0) list[i] = product;
    else list.unshift(product);
    await writeJson(PRODUCTS_FILE, list);
    return product;
  });
}

export async function deleteProduct(id: string) {
  return withLock(PRODUCTS_FILE, async () => {
    const list = await readJson<Product[]>(PRODUCTS_FILE, []);
    const next = list.filter((p) => p.id !== id);
    await writeJson(PRODUCTS_FILE, next);
    return true;
  });
}

export async function decrementStock(items: Array<{ productId: string; quantity: number }>) {
  return withLock(PRODUCTS_FILE, async () => {
    const list = await readJson<Product[]>(PRODUCTS_FILE, []);
    for (const item of items) {
      const p = list.find((x) => x.id === item.productId);
      if (p) p.stock = Math.max(0, p.stock - item.quantity);
    }
    await writeJson(PRODUCTS_FILE, list);
  });
}

// ── Orders ──
export async function getOrders(): Promise<Order[]> {
  return readJson<Order[]>(ORDERS_FILE, []);
}

export async function saveOrders(orders: Order[]) {
  return withLock(ORDERS_FILE, () => writeJson(ORDERS_FILE, orders));
}

export async function getOrderById(id: string): Promise<Order | null> {
  const list = await getOrders();
  return list.find((o) => o.id === id) ?? null;
}

export async function createOrder(order: Order) {
  return withLock(ORDERS_FILE, async () => {
    const list = await readJson<Order[]>(ORDERS_FILE, []);
    list.unshift(order);
    await writeJson(ORDERS_FILE, list);
    return order;
  });
}

export async function updateOrder(id: string, patch: Partial<Order>) {
  return withLock(ORDERS_FILE, async () => {
    const list = await readJson<Order[]>(ORDERS_FILE, []);
    const i = list.findIndex((o) => o.id === id);
    if (i < 0) return null;
    list[i] = { ...list[i], ...patch, updatedAt: new Date().toISOString() };
    await writeJson(ORDERS_FILE, list);
    return list[i];
  });
}

export async function deleteOrder(id: string) {
  return withLock(ORDERS_FILE, async () => {
    const list = await readJson<Order[]>(ORDERS_FILE, []);
    const next = list.filter((o) => o.id !== id);
    await writeJson(ORDERS_FILE, next);
    return true;
  });
}

// ── Content ──
export async function getContent(): Promise<SiteContent> {
  const fallback = (await import('@/data/content-default')).default;
  return readJson<SiteContent>(CONTENT_FILE, fallback);
}

export async function saveContent(content: SiteContent) {
  return withLock(CONTENT_FILE, () => writeJson(CONTENT_FILE, content));
}

// ── Settings ──
export async function getSettings(): Promise<SiteSettings> {
  const fallback = (await import('@/data/settings-default')).default;
  return readJson<SiteSettings>(SETTINGS_FILE, fallback);
}

export async function saveSettings(settings: SiteSettings) {
  return withLock(SETTINGS_FILE, () => writeJson(SETTINGS_FILE, settings));
}
