import { getOrders } from '@/lib/db';
import { OrdersTable } from './OrdersTable';

export default async function AdminPedidosPage() {
  const orders = await getOrders();
  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm text-espresso-lighter">
          {orders.length} pedidos totales · {orders.filter((o) => o.status === 'pendiente').length} pendientes
        </p>
      </header>
      <OrdersTable orders={orders} />
    </div>
  );
}
