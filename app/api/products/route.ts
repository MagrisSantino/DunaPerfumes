import { NextResponse } from 'next/server';
import { getProducts, upsertProduct } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';
import { generateId, slugify } from '@/lib/utils';
import type { Product } from '@/types';

export const runtime = 'nodejs';

export async function GET() {
  const products = await getProducts();
  return NextResponse.json({ products });
}

export async function POST(req: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }
  const body = (await req.json()) as Partial<Product>;
  if (!body.brand || !body.model || !body.price) {
    return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 });
  }
  const now = new Date().toISOString();
  const product: Product = {
    id: body.id || generateId('p_'),
    slug: body.slug || slugify(`${body.brand}-${body.model}-${body.size ?? ''}`),
    brand: body.brand!,
    classification: (body.classification as 'ORIGINAL' | 'ALTERNATIVA') || 'ALTERNATIVA',
    model: body.model!,
    gender: (body.gender as 'UNISEX' | 'MASCULINO' | 'FEMENINO') || 'UNISEX',
    size: body.size || '100 ml',
    fragranceType: body.fragranceType || 'Eau de Parfum',
    price: Number(body.price) || 0,
    cashPrice: Number(body.cashPrice) || Math.round(Number(body.price) * 0.9),
    notes: body.notes || '',
    family: body.family,
    topNotes: body.topNotes,
    stock: Number(body.stock) || 0,
    featured: Boolean(body.featured),
    active: body.active !== false,
    images: body.images || [],
    createdAt: body.createdAt || now,
    updatedAt: now,
  };
  await upsertProduct(product);
  return NextResponse.json({ product }, { status: 201 });
}
