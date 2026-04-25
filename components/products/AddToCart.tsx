'use client';

import { useState } from 'react';
import { Minus, Plus, ShoppingBag, MessageCircle } from 'lucide-react';
import type { Product } from '@/types';
import { useCart } from '@/store/cart-store';
import { useToast } from '@/components/ui/Toast';
import { formatPrice } from '@/lib/utils';

export function AddToCart({ product, whatsappPhone }: { product: Product; whatsappPhone: string }) {
  const [qty, setQty] = useState(1);
  const add = useCart((s) => s.add);
  const openCart = useCart((s) => s.open);
  const toast = useToast();

  const soldOut = product.stock <= 0;

  const inc = () => setQty((q) => Math.min(q + 1, Math.max(product.stock, 1)));
  const dec = () => setQty((q) => Math.max(1, q - 1));

  const handleAdd = () => {
    if (soldOut) {
      toast.show('Producto sin stock disponible', 'error');
      return;
    }
    add(product, qty);
    openCart();
  };

  const waText = encodeURIComponent(
    `Hola DUNA! Quiero consultar por: ${product.brand} ${product.model} (${product.size})`,
  );

  return (
    <div className="space-y-5">
      {!soldOut && (
        <div>
          <label className="label-duna">Cantidad</label>
          <div className="inline-flex items-center border border-sand-300">
            <button
              onClick={dec}
              disabled={qty <= 1}
              className="p-3 hover:bg-sand-100 disabled:opacity-40"
              aria-label="Restar"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-5 font-medium tabular-nums text-espresso w-12 text-center">{qty}</span>
            <button
              onClick={inc}
              disabled={qty >= product.stock}
              className="p-3 hover:bg-sand-100 disabled:opacity-40"
              aria-label="Sumar"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          {product.stock <= 3 && (
            <p className="text-xs text-gold mt-2">⚠ Últimas {product.stock} unidades</p>
          )}
        </div>
      )}

      <div className="flex flex-col gap-3 pt-2">
        <button
          onClick={handleAdd}
          disabled={soldOut}
          className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ShoppingBag className="w-4 h-4" />
          {soldOut ? 'Sin stock' : `Agregar — ${formatPrice(product.price * qty)}`}
        </button>
        <a
          href={`https://wa.me/${whatsappPhone}?text=${waText}`}
          target="_blank"
          rel="noreferrer"
          className="btn-secondary w-full"
        >
          <MessageCircle className="w-4 h-4" />
          Consultar por WhatsApp
        </a>
      </div>
    </div>
  );
}
