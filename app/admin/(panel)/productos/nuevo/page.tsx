import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ProductForm } from '@/components/admin/ProductForm';

export default function NuevoProductoPage() {
  return (
    <div className="space-y-6">
      <Link href="/admin/productos" className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-espresso-lighter hover:text-gold">
        <ArrowLeft className="w-4 h-4" />
        Volver a productos
      </Link>
      <ProductForm />
    </div>
  );
}
