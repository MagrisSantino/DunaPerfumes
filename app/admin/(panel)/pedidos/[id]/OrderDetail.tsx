'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MessageCircle, Save, Trash2, Copy, Check, Loader2 } from 'lucide-react';
import type { Order, OrderStatus, SiteSettings } from '@/types';
import { formatDateTime, formatPrice } from '@/lib/utils';
import { useToast } from '@/components/ui/Toast';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { buildOrderConfirmationMessage, buildWhatsAppUrl } from '@/lib/whatsapp';

const STATUSES: OrderStatus[] = ['pendiente', 'confirmado', 'pagado', 'enviado', 'entregado', 'cancelado'];

export function OrderDetail({ order, settings }: { order: Order; settings: SiteSettings }) {
  const router = useRouter();
  const toast = useToast();
  const [status, setStatus] = useState<OrderStatus>(order.status);
  const [notes, setNotes] = useState(order.notes || '');
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);

  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/orders/${order.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, notes }),
      });
      if (!res.ok) throw new Error();
      toast.show('Pedido actualizado', 'success');
      router.refresh();
    } catch {
      toast.show('Error al actualizar', 'error');
    } finally {
      setSaving(false);
    }
  };

  const del = async () => {
    if (!confirm(`¿Eliminar pedido ${order.code}? Esta acción no se puede deshacer.`)) return;
    try {
      const res = await fetch(`/api/orders/${order.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      toast.show('Pedido eliminado', 'success');
      router.push('/admin/pedidos');
    } catch {
      toast.show('Error al eliminar', 'error');
    }
  };

  const copyLink = () => {
    const url = `${window.location.origin}/checkout/gracias?code=${order.code}&id=${order.id}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const waUrl = buildWhatsAppUrl(
    order.customer.phone.replace(/[^0-9]/g, '') || settings.whatsappRaw,
    buildOrderConfirmationMessage(order, settings),
  );

  return (
    <div className="grid lg:grid-cols-[1fr_340px] gap-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="admin-card p-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-[10px] tracking-widest3 uppercase text-espresso-lighter">Pedido</p>
            <p className="font-display text-3xl text-espresso">#{order.code}</p>
            <p className="text-xs text-espresso-lighter mt-1">Creado: {formatDateTime(order.createdAt)}</p>
            {order.updatedAt !== order.createdAt && (
              <p className="text-xs text-espresso-lighter">Actualizado: {formatDateTime(order.updatedAt)}</p>
            )}
          </div>
          <StatusBadge status={order.status} />
        </div>

        {/* Items */}
        <div className="admin-card p-6">
          <h3 className="font-display text-xl text-espresso mb-4">Productos</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-widest text-espresso-lighter border-b border-sand-200">
                  <th className="py-2 pr-3">Producto</th>
                  <th className="py-2 pr-3 text-center">Cantidad</th>
                  <th className="py-2 pr-3 text-right">Unitario</th>
                  <th className="py-2 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((it) => (
                  <tr key={it.productId} className="border-b border-sand-100">
                    <td className="py-3 pr-3">
                      <p className="font-medium text-espresso">{it.brand} — {it.model}</p>
                      <p className="text-xs text-espresso-lighter">{it.size}</p>
                    </td>
                    <td className="py-3 pr-3 text-center tabular-nums">{it.quantity}</td>
                    <td className="py-3 pr-3 text-right tabular-nums">{formatPrice(it.unitPrice)}</td>
                    <td className="py-3 text-right tabular-nums font-medium">{formatPrice(it.subtotal)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="text-sm">
                  <td colSpan={3} className="py-3 pr-3 text-right text-espresso-lighter">Subtotal</td>
                  <td className="py-3 text-right tabular-nums">{formatPrice(order.subtotal)}</td>
                </tr>
                {order.discount > 0 && (
                  <tr className="text-sm text-gold">
                    <td colSpan={3} className="py-1 pr-3 text-right">Descuento</td>
                    <td className="py-1 text-right tabular-nums">-{formatPrice(order.discount)}</td>
                  </tr>
                )}
                {order.shippingCost > 0 && (
                  <tr className="text-sm">
                    <td colSpan={3} className="py-1 pr-3 text-right text-espresso-lighter">Envío</td>
                    <td className="py-1 text-right tabular-nums">{formatPrice(order.shippingCost)}</td>
                  </tr>
                )}
                <tr className="text-base font-medium">
                  <td colSpan={3} className="py-3 pr-3 text-right text-espresso">Total</td>
                  <td className="py-3 text-right tabular-nums text-espresso">{formatPrice(order.total)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Customer & shipping */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="admin-card p-6">
            <h3 className="font-display text-xl text-espresso mb-4">Cliente</h3>
            <dl className="space-y-2 text-sm">
              <Item label="Nombre" value={order.customer.name} />
              <Item label="Teléfono" value={order.customer.phone} />
              {order.customer.email && <Item label="Email" value={order.customer.email} />}
              {order.customer.dni && <Item label="DNI" value={order.customer.dni} />}
            </dl>
          </div>

          <div className="admin-card p-6">
            <h3 className="font-display text-xl text-espresso mb-4">Entrega & pago</h3>
            <dl className="space-y-2 text-sm">
              <Item label="Método" value={order.shipping.method === 'envio' ? 'Envío a domicilio' : 'Retiro en punto'} />
              {order.shipping.address && <Item label="Dirección" value={order.shipping.address} />}
              {order.shipping.city && <Item label="Ciudad" value={order.shipping.city} />}
              {order.shipping.zone && <Item label="Zona" value={order.shipping.zone} />}
              <Item label="Pago" value={order.paymentMethod} />
            </dl>
            {order.shipping.notes && (
              <p className="text-xs text-espresso-lighter mt-3 pt-3 border-t border-sand-200">
                Notas del cliente: {order.shipping.notes}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        <div className="admin-card p-6 space-y-4">
          <h3 className="font-display text-xl text-espresso">Estado</h3>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as OrderStatus)}
            className="input-admin"
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
            ))}
          </select>
          <label className="block">
            <span className="label-duna">Notas internas</span>
            <textarea
              className="input-admin min-h-[90px] resize-y"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Recordatorios, pagos, seguimiento..."
            />
          </label>
          <button onClick={save} disabled={saving} className="btn-primary w-full">
            {saving ? <><Loader2 className="w-4 h-4 animate-spin" />Guardando...</> : <><Save className="w-4 h-4" />Guardar cambios</>}
          </button>
        </div>

        <div className="admin-card p-6 space-y-3">
          <h3 className="font-display text-xl text-espresso">Acciones</h3>
          <a
            href={waUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-secondary w-full"
          >
            <MessageCircle className="w-4 h-4" />
            Abrir en WhatsApp
          </a>
          <button onClick={copyLink} className="btn-ghost w-full">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copiado' : 'Copiar link'}
          </button>
          <button onClick={del} className="btn-ghost w-full text-red-700 hover:bg-red-50">
            <Trash2 className="w-4 h-4" />
            Eliminar pedido
          </button>
        </div>
      </div>
    </div>
  );
}

function Item({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[10px] tracking-widest3 uppercase text-espresso-lighter">{label}</dt>
      <dd className="text-espresso">{value}</dd>
    </div>
  );
}
