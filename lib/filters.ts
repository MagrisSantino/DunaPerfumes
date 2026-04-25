import type { Product } from '@/types';

export interface ShopQuery {
  q?: string;
  marca?: string;
  genero?: string;
  clasificacion?: string;
  familia?: string;
  stock?: string;
  sort?: string;
  [k: string]: string | string[] | undefined;
}

export function filterAndSort(products: Product[], query: ShopQuery): Product[] {
  let list = products.filter((p) => p.active);

  if (query.stock === '1') list = list.filter((p) => p.stock > 0);

  if (query.clasificacion) {
    list = list.filter((p) => p.classification === query.clasificacion);
  }
  if (query.genero) {
    list = list.filter((p) => p.gender === query.genero);
  }
  if (query.marca) {
    list = list.filter((p) => p.brand.toLowerCase() === (query.marca as string).toLowerCase());
  }
  if (query.familia) {
    const fam = (query.familia as string).toLowerCase();
    list = list.filter((p) => (p.family || p.fragranceType || '').toLowerCase().includes(fam));
  }
  if (query.q) {
    const needle = (query.q as string).toLowerCase();
    list = list.filter((p) =>
      [p.brand, p.model, p.fragranceType, p.notes, p.family]
        .filter(Boolean)
        .some((s) => String(s).toLowerCase().includes(needle)),
    );
  }

  const sort = query.sort ?? 'relevant';
  switch (sort) {
    case 'price-asc':
      list = [...list].sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      list = [...list].sort((a, b) => b.price - a.price);
      break;
    case 'name-asc':
      list = [...list].sort((a, b) => a.model.localeCompare(b.model));
      break;
    case 'newest':
      list = [...list].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
      break;
    default:
      // Relevance: featured first, then in-stock, then alphabetical
      list = [...list].sort((a, b) => {
        const fa = (a.featured ? 0 : 1) - (b.featured ? 0 : 1);
        if (fa !== 0) return fa;
        const sa = (a.stock > 0 ? 0 : 1) - (b.stock > 0 ? 0 : 1);
        if (sa !== 0) return sa;
        return a.model.localeCompare(b.model);
      });
  }

  return list;
}

export function extractFilterOptions(products: Product[]) {
  const brands = Array.from(new Set(products.map((p) => p.brand))).sort();
  const genders = Array.from(new Set(products.map((p) => p.gender)));
  const classifications = Array.from(new Set(products.map((p) => p.classification)));
  const families = Array.from(
    new Set(products.map((p) => p.family || p.fragranceType).filter(Boolean) as string[]),
  ).sort();
  const maxPrice = Math.max(...products.map((p) => p.price), 0);
  return { brands, genders, classifications, families, maxPrice };
}
