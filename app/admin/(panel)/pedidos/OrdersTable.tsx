'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Search, Filter } from 'lucide-react';
import type { Order, OrderStatus } from '@/types';
import { formatDateTime, formatPrice, cn } from '@/lib/utils';
import { StatusBadge } from '@/components/admin/StatusBadge';

const FILTERS: Array<{ key: 'todos' | OrderStatus; label: string }> = [
  { key: 'todos', label: 'Todos' },
  { key: 'pendiente', label: 'Pendientes' },
  { key: 'confirmado', label: 'Confirmados' },
  { key: 'pagado', label: 'Pagados' },
  { key: 'enviado', label: 'Enviados' },
  { key: 'entregado', label: 'Entregados' },
  { key: 'cancelado', label: 'Cancelados' },
];

export function OrdersTable({ orders }: { orders: Order[] }) {
  const [q, setQ] = useState('');
  const [filter, setFilter] = useState<(typeof FILTERS)[number]['key']>('todos');

  const visible = useMemo(() => {
    let list = orders;
    if (filter !== 'todos') list = list.filter((o) => o.status === filter);
    if (q) {
      const needle = q.toLowerCase();
      list = list.filter(
        (o) =>
          o.code.toLowerCase().includes(needle) ||
          o.customer.name.toLowerCase().includes(needle) ||
          o.customer.phone.toLowerCase().includes(needle),
      );
    }
    return list;
  }, [orders, q, filter]);

  return (
    <div className="admin-card overflow-hidden">
      <div className="p-4 border-b border-sand-200 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-espresso-lighter" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar código, nombre, teléfono..."
            className="input-admin pl-9"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {FILTERS.map((f) => {
            const count = f.key === 'todos' ? orders.length : orders.filter((o) => o.status === f.key).length;
            return (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={cn(
                  'px-3 py-1.5 text-xs rounded border whitespace-nowrap',
                  filter === f.key
                    ? 'bg-espresso text-cream border-espresso'
                    : 'text-espresso bg-white border-sand-300 hover:border-espresso',
                )}
              >
                {f.label} ({count})
              </button>
            );
          })}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs tracking-widest uppercase text-espresso-lighter border-b border-sand-200 bg-sand-50">
              <th className="py-3 px-4">Código</th>
              <th className="py-3 px-3">Cliente</th>
              <th className="py-3 px-3">Items</th>
              <th className="py-3 px-3 text-right">Total</th>
              <th className="py-3 px-3">Pago</th>
              <th className="py-3 px-3">Estado</th>
              <th className="py-3 px-3">Fecha</th>
              <th className="py-3 px-4" />
            </tr>
          </thead>
          <tbody>
            {visible.map((o) => (
              <tr key={o.id} className="border-b border-sand-100 hover:bg-sand-50">
                <td className="py-3 px-4 font-mono text-espresso">{o.code}</td>
                <td className="py-3 px-3">
                  <p className="font-medium text-espresso">{o.customer.name}</p>
                  <p className="text-xs text-espresso-lighter">{o.customer.phone}</p>
                </td>
                <td className="py-3 px-3 text-espresso-lighter">
                  {o.items.reduce((a, i) => a + i.quantity, 0)} unidades · {o.items.length} ítems
                </td>
                <td className="py-3 px-3 text-right tabular-nums font-medium">{formatPrice(o.total)}</td>
                <td className="py-3 px-3 capitalize text-espresso">{o.paymentMethod}</td>
                <td className="py-3 px-3"><StatusBadge status={o.status} /></td>
                <td className="py-3 px-3 text-xs text-espresso-lighter">{formatDateTime(o.createdAt)}</td>
                <td className="py-3 px-4 text-right">
                  <Link
                    href={`/admin/pedidos/${o.id}`}
                    className="text-gold hover:text-espresso text-xs tracking-widest uppercase"
                  >
                    Ver →
                  </Link>
                </td>
              </tr>
            ))}
            {visible.length === 0 && (
              <tr>
                <td colSpan={8} className="py-12 text-center text-espresso-lighter">
                  <Filter className="w-8 h-8 mx-auto mb-2 text-sand-400" />
                  No hay pedidos con estos filtros.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
