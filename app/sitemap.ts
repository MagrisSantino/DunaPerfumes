import type { MetadataRoute } from 'next';
import { getProducts } from '@/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://dunaperfumes.com.ar';
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${base}/tienda`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/tienda/originales`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/tienda/alternativas`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/nosotros`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/contacto`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/envios`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/preguntas`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
  ];

  const products = await getProducts();
  const productRoutes: MetadataRoute.Sitemap = products
    .filter((p) => p.active)
    .map((p) => ({
      url: `${base}/producto/${p.slug}`,
      lastModified: new Date(p.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

  return [...staticRoutes, ...productRoutes];
}
