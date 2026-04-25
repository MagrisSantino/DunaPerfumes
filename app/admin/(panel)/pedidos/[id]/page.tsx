import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { getOrderById, getSettings } from '@/lib/db';
import { OrderDetail } from './OrderDetail';

export default async function OrderPage({ params }: { params: { id: string } }) {
  const [order, settings] = await Promise.all([getOrderById(params.id), getSettings()]);
  if (!order) notFound();
  return (
    <div className="space-y-6">
      <Link href="/admin/pedidos" className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-espresso-lighter hover:text-gold">
        <ArrowLeft className="w-4 h-4" />
        Volver a pedidos
      </Link>
      <OrderDetail order={order} settings={settings} />
    </div>
  );
}
