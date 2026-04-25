import type { OrderStatus } from '@/types';

const MAP: Record<OrderStatus, { label: string; cls: string }> = {
  pendiente: { label: 'Pendiente', cls: 'bg-gold/15 text-gold-darker' },
  confirmado: { label: 'Confirmado', cls: 'bg-blue-100 text-blue-800' },
  pagado: { label: 'Pagado', cls: 'bg-purple-100 text-purple-800' },
  enviado: { label: 'Enviado', cls: 'bg-teal-100 text-teal-800' },
  entregado: { label: 'Entregado', cls: 'bg-green-100 text-green-800' },
  cancelado: { label: 'Cancelado', cls: 'bg-red-100 text-red-800' },
};

export function StatusBadge({ status }: { status: OrderStatus }) {
  const s = MAP[status] ?? MAP.pendiente;
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] tracking-widest uppercase ${s.cls}`}>
      {s.label}
    </span>
  );
}
