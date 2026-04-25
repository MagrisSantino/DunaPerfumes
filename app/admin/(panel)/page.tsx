import Link from 'next/link';
import {
  ShoppingCart,
  DollarSign,
  Package,
  AlertTriangle,
  TrendingUp,
  ArrowRight,
  ArrowDownRight,
  Clock,
} from 'lucide-react';
import { getOrders, getProducts } from '@/lib/db';
import { formatDateTime, formatPrice } from '@/lib/utils';
import type { Order } from '@/types';
import { StatusBadge } from '@/components/admin/StatusBadge';

export default async function AdminDashboard() {
  const [orders, products] = await Promise.all([getOrders(), getProducts()]);

  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const start30 = orders.filter((o) => new Date(o.createdAt) >= thirtyDaysAgo && o.status !== 'cancelado');
  const start7 = orders.filter((o) => new Date(o.createdAt) >= sevenDaysAgo && o.status !== 'cancelado');

  const totalRevenue = start30.reduce((a, o) => a + o.total, 0);
  const totalRevenue7 = start7.reduce((a, o) => a + o.total, 0);
  const avgTicket = start30.length > 0 ? totalRevenue / start30.length : 0;

  const pending = orders.filter((o) => o.status === 'pendiente').length;
  const lowStock = products.filter((p) => p.active && p.stock > 0 && p.stock <= 3);
  const outOfStock = products.filter((p) => p.active && p.stock === 0).length;

  const recent = orders.slice(0, 8);
  const topProducts = computeTopProducts(orders).slice(0, 6);

  return (
    <div className="space-y-8">
      <header>
        <p className="text-sm text-espresso-lighter">Bienvenido al panel de control de DUNA</p>
      </header>

      {/* KPIs */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          icon={DollarSign}
          label="Ventas 30 días"
          value={formatPrice(totalRevenue)}
          delta={`${start7.length} en últimos 7 días · ${formatPrice(totalRevenue7)}`}
          tone="gold"
        />
        <KPICard
          icon={ShoppingCart}
          label="Pedidos 30 días"
          value={String(start30.length)}
          delta={`Ticket promedio ${formatPrice(avgTicket)}`}
          tone="espresso"
        />
        <KPICard
          icon={Clock}
          label="Pendientes"
          value={String(pending)}
          delta={pending > 0 ? 'Requieren tu atención' : 'Todo al día'}
          tone={pending > 0 ? 'warning' : 'espresso'}
        />
        <KPICard
          icon={Package}
          label="Productos"
          value={String(products.filter((p) => p.active).length)}
          delta={`${outOfStock} sin stock · ${lowStock.length} bajo stock`}
          tone={outOfStock + lowStock.length > 0 ? 'warning' : 'espresso'}
        />
      </section>

      <div className="grid lg:grid-cols-[1fr_360px] gap-6">
        {/* Recent orders */}
        <section className="admin-card p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-display text-2xl text-espresso">Pedidos recientes</h2>
              <p className="text-sm text-espresso-lighter">Los últimos 8 pedidos recibidos</p>
            </div>
            <Link href="/admin/pedidos" className="text-xs uppercase tracking-widest text-gold hover:text-espresso">
              Ver todos →
            </Link>
          </div>
          {recent.length === 0 ? (
            <div className="py-10 text-center">
              <ShoppingCart className="w-10 h-10 text-sand-400 mx-auto mb-3" />
              <p className="text-sm text-espresso-lighter">Aún no hay pedidos</p>
            </div>
          ) : (
            <div className="overflow-x-auto -mx-6 px-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs tracking-widest uppercase text-espresso-lighter border-b border-sand-200">
                    <th className="py-2 pr-3">Pedido</th>
                    <th className="py-2 pr-3">Cliente</th>
                    <th className="py-2 pr-3">Estado</th>
                    <th className="py-2 pr-3 text-right">Total</th>
                    <th className="py-2 pr-3">Fecha</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {recent.map((o) => (
                    <tr key={o.id} className="border-b border-sand-100 last:border-0">
                      <td className="py-3 pr-3 font-mono text-espresso">{o.code}</td>
                      <td className="py-3 pr-3 text-espresso truncate max-w-[160px]">{o.customer.name}</td>
                      <td className="py-3 pr-3"><StatusBadge status={o.status} /></td>
                      <td className="py-3 pr-3 text-right tabular-nums">{formatPrice(o.total)}</td>
                      <td className="py-3 pr-3 text-xs text-espresso-lighter">{formatDateTime(o.createdAt)}</td>
                      <td className="py-3">
                        <Link href={`/admin/pedidos/${o.id}`} className="text-gold hover:text-espresso text-xs tracking-widest uppercase">
                          Ver →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Top products */}
        <section className="admin-card p-6">
          <h2 className="font-display text-2xl text-espresso mb-1">Más vendidos</h2>
          <p className="text-sm text-espresso-lighter mb-5">Últimos 30 días</p>
          {topProducts.length === 0 ? (
            <div className="py-8 text-center">
              <TrendingUp className="w-8 h-8 text-sand-400 mx-auto mb-2" />
              <p className="text-xs text-espresso-lighter">Sin ventas registradas</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {topProducts.map((t, i) => (
                <li key={t.productId} className="flex items-center gap-3 text-sm">
                  <span className="w-6 h-6 rounded-full bg-gold/15 text-gold font-medium text-xs flex items-center justify-center">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-espresso truncate">{t.model}</p>
                    <p className="text-xs text-espresso-lighter truncate">{t.brand} · {t.qty} unidades</p>
                  </div>
                  <span className="text-xs text-espresso-lighter tabular-nums">{formatPrice(t.revenue)}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {/* Stock alerts */}
      {(lowStock.length > 0 || outOfStock > 0) && (
        <section className="admin-card p-6 border-l-4 border-l-gold">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-gold" />
              <h2 className="font-display text-xl text-espresso">Alertas de stock</h2>
            </div>
            <Link href="/admin/productos?stock=low" className="text-xs tracking-widest uppercase text-gold hover:text-espresso">
              Gestionar →
            </Link>
          </div>
          {lowStock.length > 0 && (
            <div className="space-y-2">
              {lowStock.slice(0, 5).map((p) => (
                <div key={p.id} className="flex items-center justify-between text-sm">
                  <span className="text-espresso">{p.brand} — {p.model}</span>
                  <span className="text-gold font-medium tabular-nums">{p.stock} unidades</span>
                </div>
              ))}
              {lowStock.length > 5 && (
                <p className="text-xs text-espresso-lighter pt-2">+{lowStock.length - 5} productos más con bajo stock</p>
              )}
            </div>
          )}
          {outOfStock > 0 && (
            <p className="text-sm text-red-700 pt-3 mt-3 border-t border-sand-200">
              <ArrowDownRight className="w-4 h-4 inline" /> {outOfStock} producto{outOfStock === 1 ? '' : 's'} sin stock
            </p>
          )}
        </section>
      )}

      {/* Quick actions */}
      <section className="grid sm:grid-cols-3 gap-4">
        <QuickAction href="/admin/productos/nuevo" title="Agregar producto" description="Cargar una fragancia nueva al catálogo" />
        <QuickAction href="/admin/contenido" title="Editar textos" description="Modificar contenido del sitio" />
        <QuickAction href="/admin/pedidos" title="Gestionar pedidos" description="Cambiar estado y preparar envíos" />
      </section>
    </div>
  );
}

function KPICard({
  icon: Icon,
  label,
  value,
  delta,
  tone,
}: {
  icon: typeof DollarSign;
  label: string;
  value: string;
  delta: string;
  tone: 'gold' | 'espresso' | 'warning';
}) {
  const tones = {
    gold: 'from-gold/15 to-gold/5 text-gold',
    espresso: 'from-espresso/10 to-espresso/0 text-espresso',
    warning: 'from-red-100 to-red-50 text-red-700',
  };
  return (
    <div className="admin-card p-5">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-full bg-gradient-to-br flex items-center justify-center ${tones[tone]}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <p className="text-xs tracking-widest uppercase text-espresso-lighter mb-1">{label}</p>
      <p className="font-display text-3xl text-espresso tabular-nums">{value}</p>
      <p className="text-xs text-espresso-lighter mt-2">{delta}</p>
    </div>
  );
}

function QuickAction({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <Link href={href} className="admin-card p-5 flex items-start justify-between gap-3 hover:border-gold transition-colors group">
      <div>
        <p className="font-medium text-espresso mb-1">{title}</p>
        <p className="text-xs text-espresso-lighter">{description}</p>
      </div>
      <ArrowRight className="w-4 h-4 text-gold group-hover:translate-x-1 transition-transform shrink-0 mt-1" />
    </Link>
  );
}

function computeTopProducts(orders: Order[]) {
  const thirty = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const map = new Map<string, { productId: string; brand: string; model: string; qty: number; revenue: number }>();
  for (const o of orders) {
    if (o.status === 'cancelado' || new Date(o.createdAt) < thirty) continue;
    for (const it of o.items) {
      const key = it.productId;
      const e = map.get(key) ?? { productId: it.productId, brand: it.brand, model: it.model, qty: 0, revenue: 0 };
      e.qty += it.quantity;
      e.revenue += it.subtotal;
      map.set(key, e);
    }
  }
  return [...map.values()].sort((a, b) => b.qty - a.qty);
}
