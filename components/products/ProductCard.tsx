'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag } from 'lucide-react';
import type { Product } from '@/types';
import { formatPrice, cn } from '@/lib/utils';
import { ProductPlaceholder } from './ProductPlaceholder';
import { useCart } from '@/store/cart-store';
import { useToast } from '@/components/ui/Toast';

export function ProductCard({ product, compact = false }: { product: Product; compact?: boolean }) {
  const add = useCart((s) => s.add);
  const openCart = useCart((s) => s.open);
  const toast = useToast();

  const onAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.stock <= 0) {
      toast.show('Producto sin stock disponible', 'error');
      return;
    }
    add(product, 1);
    openCart();
  };

  const savings = product.price - product.cashPrice;

  return (
    <Link
      href={`/producto/${product.slug}`}
      className={cn(
        'group relative flex flex-col bg-sand-50 overflow-hidden transition-all duration-500',
        'hover:shadow-elegant',
      )}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-sand-100">
        {product.images?.[0] ? (
          <Image
            src={product.images[0]}
            alt={product.model}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
            <ProductPlaceholder brand={product.brand} model={product.model} />
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.classification === 'ORIGINAL' && (
            <span className="bg-espresso text-cream text-[9px] tracking-widest3 uppercase px-2 py-1">
              Original
            </span>
          )}
          {product.featured && (
            <span className="bg-gold text-cream text-[9px] tracking-widest3 uppercase px-2 py-1">
              Destacado
            </span>
          )}
          {product.stock <= 0 && (
            <span className="bg-red-800 text-cream text-[9px] tracking-widest3 uppercase px-2 py-1">
              Sin stock
            </span>
          )}
          {product.stock > 0 && product.stock <= 3 && (
            <span className="bg-cream/90 backdrop-blur text-espresso text-[9px] tracking-widest3 uppercase px-2 py-1 border border-sand-300">
              Últimas {product.stock}
            </span>
          )}
        </div>

        {/* Quick add */}
        <button
          onClick={onAdd}
          className={cn(
            'absolute bottom-3 right-3 flex items-center gap-2 px-4 py-2.5',
            'bg-cream/95 backdrop-blur text-espresso text-[11px] uppercase tracking-widest font-medium',
            'border border-espresso/10 hover:bg-espresso hover:text-cream',
            'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0',
            'transition-all duration-300 shadow-soft',
          )}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          Agregar
        </button>
      </div>

      <div className={cn('p-4 flex-1 flex flex-col', compact && 'p-3')}>
        <p className="text-[10px] tracking-widest3 uppercase text-espresso-lighter">
          {product.brand} · {product.gender}
        </p>
        <h3 className="font-display text-xl leading-tight text-espresso mt-1 line-clamp-2 group-hover:text-gold transition-colors">
          {product.model}
        </h3>
        <p className="text-xs text-espresso-lighter mt-1 line-clamp-1">
          {product.fragranceType} · {product.size}
        </p>
        <div className="mt-3 pt-3 border-t border-sand-200 flex items-end justify-between">
          <div>
            <p className="font-medium text-espresso tabular-nums">{formatPrice(product.price)}</p>
            {savings > 0 && (
              <p className="text-[10px] text-gold tracking-wider">
                {formatPrice(product.cashPrice)} en efectivo
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
