import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { getProductById } from '@/lib/db';
import { ProductForm } from '@/components/admin/ProductForm';

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id);
  if (!product) notFound();
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link href="/admin/productos" className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-espresso-lighter hover:text-gold">
          <ArrowLeft className="w-4 h-4" />
          Volver a productos
        </Link>
        <Link
          href={`/producto/${product.slug}`}
          target="_blank"
          className="inline-flex items-center gap-1.5 text-xs text-espresso-lighter hover:text-gold"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          Ver en tienda
        </Link>
      </div>
      <ProductForm product={product} />
    </div>
  );
}
