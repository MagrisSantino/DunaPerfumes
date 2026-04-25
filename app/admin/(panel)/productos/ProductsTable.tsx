'use client';

import { useMemo, useState, useTransition } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Search, Edit, Trash2, EyeOff, Eye, Star, StarOff, Filter } from 'lucide-react';
import type { Product } from '@/types';
import { formatPrice, cn } from '@/lib/utils';
import { ProductPlaceholder } from '@/components/products/ProductPlaceholder';
import { useToast } from '@/components/ui/Toast';

type Filter = 'todos' | 'activos' | 'inactivos' | 'low-stock' | 'sin-stock' | 'destacados' | 'originales' | 'alternativas';

export function ProductsTable({ products }: { products: Product[] }) {
  const router = useRouter();
  const toast = useToast();
  const [q, setQ] = useState('');
  const [filter, setFilter] = useState<Filter>('todos');
  const [, startTransition] = useTransition();
  const [busy, setBusy] = useState<string | null>(null);

  const visible = useMemo(() => {
    let list = products;
    if (filter === 'activos') list = list.filter((p) => p.active);
    if (filter === 'inactivos') list = list.filter((p) => !p.active);
    if (filter === 'low-stock') list = list.filter((p) => p.active && p.stock > 0 && p.stock <= 3);
    if (filter === 'sin-stock') list = list.filter((p) => p.active && p.stock === 0);
    if (filter === 'destacados') list = list.filter((p) => p.featured);
    if (filter === 'originales') list = list.filter((p) => p.classification === 'ORIGINAL');
    if (filter === 'alternativas') list = list.filter((p) => p.classification === 'ALTERNATIVA');

    if (q) {
      const needle = q.toLowerCase();
      list = list.filter((p) =>
        [p.brand, p.model, p.slug, p.fragranceType].some((s) => (s || '').toLowerCase().includes(needle)),
      );
    }
    return list;
  }, [products, q, filter]);

  const toggle = async (id: string, patch: Partial<Product>, successMsg: string) => {
    setBusy(id);
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patch),
      });
      if (!res.ok) throw new Error();
      toast.show(successMsg, 'success');
      startTransition(() => router.refresh());
    } catch {
      toast.show('Error al actualizar', 'error');
    } finally {
      setBusy(null);
    }
  };

  const remove = async (id: string, name: string) => {
    if (!confirm(`¿Eliminar "${name}"? Esta acción no se puede deshacer.`)) return;
    setBusy(id);
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      toast.show('Producto eliminado', 'success');
      startTransition(() => router.refresh());
    } catch {
      toast.show('Error al eliminar', 'error');
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="admin-card overflow-hidden">
      {/* Toolbar */}
      <div className="p-4 border-b border-sand-200 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-espresso-lighter" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar por marca, modelo, slug..."
            className="input-admin pl-9"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {(['todos', 'activos', 'destacados', 'originales', 'alternativas', 'low-stock', 'sin-stock', 'inactivos'] as Filter[]).map(
            (f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  'px-3 py-1.5 text-xs rounded border whitespace-nowrap',
                  filter === f
                    ? 'bg-espresso text-cream border-espresso'
                    : 'text-espresso bg-white border-sand-300 hover:border-espresso',
                )}
              >
                {filterLabels[f]}
              </button>
            ),
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs tracking-widest uppercase text-espresso-lighter border-b border-sand-200 bg-sand-50">
              <th className="py-3 px-4">Producto</th>
              <th className="py-3 px-3">Clasif.</th>
              <th className="py-3 px-3">Precio</th>
              <th className="py-3 px-3">Efectivo</th>
              <th className="py-3 px-3 text-center">Stock</th>
              <th className="py-3 px-3 text-center">Estado</th>
              <th className="py-3 px-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((p) => (
              <tr key={p.id} className="border-b border-sand-100 hover:bg-sand-50">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-11 h-14 bg-sand-100 overflow-hidden shrink-0">
                      {p.images[0] ? (
                        <Image src={p.images[0]} alt={p.model} fill sizes="44px" className="object-cover" />
                      ) : (
                        <ProductPlaceholder brand={p.brand} model={p.model} compact />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] tracking-widest uppercase text-espresso-lighter">{p.brand} · {p.gender}</p>
                      <Link href={`/admin/productos/${p.id}`} className="font-medium text-espresso hover:text-gold">
                        {p.model}
                      </Link>
                      <p className="text-xs text-espresso-lighter">{p.size} · {p.fragranceType}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-3">
                  <span className={`text-[10px] tracking-widest uppercase px-2 py-1 ${p.classification === 'ORIGINAL' ? 'bg-espresso/10 text-espresso' : 'bg-gold/15 text-gold-darker'}`}>
                    {p.classification === 'ORIGINAL' ? 'Original' : 'Altern.'}
                  </span>
                </td>
                <td className="py-3 px-3 tabular-nums font-medium">{formatPrice(p.price)}</td>
                <td className="py-3 px-3 tabular-nums text-gold">{formatPrice(p.cashPrice)}</td>
                <td className="py-3 px-3 text-center tabular-nums">
                  <span className={cn(
                    'font-medium',
                    p.stock === 0 && 'text-red-700',
                    p.stock > 0 && p.stock <= 3 && 'text-gold',
                  )}>
                    {p.stock}
                  </span>
                </td>
                <td className="py-3 px-3 text-center">
                  <span className={cn(
                    'text-[10px] tracking-widest uppercase px-2 py-1 rounded',
                    p.active ? 'bg-green-100 text-green-800' : 'bg-sand-200 text-espresso-lighter',
                  )}>
                    {p.active ? 'Activo' : 'Oculto'}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center justify-end gap-1">
                    <IconButton
                      title={p.featured ? 'Quitar destacado' : 'Marcar destacado'}
                      disabled={busy === p.id}
                      onClick={() => toggle(p.id, { featured: !p.featured }, p.featured ? 'Destacado quitado' : 'Marcado como destacado')}
                    >
                      {p.featured ? <Star className="w-4 h-4 text-gold fill-gold" /> : <StarOff className="w-4 h-4" />}
                    </IconButton>
                    <IconButton
                      title={p.active ? 'Ocultar' : 'Publicar'}
                      disabled={busy === p.id}
                      onClick={() => toggle(p.id, { active: !p.active }, p.active ? 'Producto ocultado' : 'Producto publicado')}
                    >
                      {p.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </IconButton>
                    <Link
                      href={`/admin/productos/${p.id}`}
                      className="p-2 text-espresso-lighter hover:text-gold"
                      title="Editar"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                    <IconButton
                      title="Eliminar"
                      disabled={busy === p.id}
                      onClick={() => remove(p.id, `${p.brand} ${p.model}`)}
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </IconButton>
                  </div>
                </td>
              </tr>
            ))}
            {visible.length === 0 && (
              <tr>
                <td colSpan={7} className="py-12 text-center text-espresso-lighter">
                  <Filter className="w-8 h-8 mx-auto mb-2 text-sand-400" />
                  No hay productos que coincidan con los filtros.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function IconButton({ children, onClick, disabled, title }: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  title: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      aria-label={title}
      className="p-2 text-espresso-lighter hover:text-espresso disabled:opacity-40"
    >
      {children}
    </button>
  );
}

const filterLabels: Record<Filter, string> = {
  todos: 'Todos',
  activos: 'Activos',
  inactivos: 'Ocultos',
  'low-stock': 'Bajo stock',
  'sin-stock': 'Sin stock',
  destacados: 'Destacados',
  originales: 'Originales',
  alternativas: 'Alternativas',
};
