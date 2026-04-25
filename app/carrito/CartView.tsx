'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/store/cart-store';
import { formatPrice } from '@/lib/utils';
import { ProductPlaceholder } from '@/components/products/ProductPlaceholder';

export function CartView() {
  const { items, setQuantity, remove, subtotal, cashDiscount, totalItems } = useCart();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <CartSkeleton />;

  if (items.length === 0) {
    return (
      <section className="container-duna py-24">
        <div className="max-w-md mx-auto text-center space-y-6">
          <div className="w-24 h-24 mx-auto rounded-full bg-sand-100 flex items-center justify-center">
            <ShoppingBag className="w-10 h-10 text-gold" />
          </div>
          <h1 className="font-display text-4xl text-espresso">Tu carrito está vacío</h1>
          <p className="text-espresso-lighter">
            Empezá a explorar nuestra colección de perfumes árabes y encontrá tu fragancia firma.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/tienda" className="btn-primary">Explorar tienda</Link>
            <Link href="/tienda/originales" className="btn-secondary">Ver originales</Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="container-duna py-12 lg:py-16">
      <div className="mb-10">
        <p className="eyebrow mb-2">Tu selección</p>
        <h1 className="font-display text-4xl md:text-5xl text-espresso">
          Carrito <span className="italic text-gold">({totalItems()})</span>
        </h1>
      </div>

      <div className="grid lg:grid-cols-[1fr_400px] gap-10 lg:gap-14 items-start">
        {/* Items */}
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.productId}
              className="flex gap-4 md:gap-5 p-4 md:p-5 bg-cream border border-sand-200"
            >
              <Link
                href={`/producto/${item.slug}`}
                className="relative w-24 h-28 md:w-32 md:h-36 shrink-0 bg-sand-100 overflow-hidden"
              >
                {item.image ? (
                  <Image src={item.image} alt={item.model} fill sizes="120px" className="object-cover" />
                ) : (
                  <ProductPlaceholder brand={item.brand} model={item.model} />
                )}
              </Link>
              <div className="flex-1 min-w-0 flex flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[10px] tracking-widest3 uppercase text-espresso-lighter">
                      {item.brand}
                    </p>
                    <Link
                      href={`/producto/${item.slug}`}
                      className="font-display text-xl md:text-2xl text-espresso hover:text-gold leading-tight line-clamp-2"
                    >
                      {item.model}
                    </Link>
                    <p className="text-xs text-espresso-lighter mt-1">{item.size}</p>
                  </div>
                  <button
                    onClick={() => remove(item.productId)}
                    className="text-espresso-lighter hover:text-red-700"
                    aria-label="Eliminar"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-end justify-between gap-3 mt-auto pt-3">
                  <div className="inline-flex items-center border border-sand-300">
                    <button
                      onClick={() => setQuantity(item.productId, item.quantity - 1)}
                      className="p-2 hover:bg-sand-100"
                      aria-label="Restar"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-4 text-sm tabular-nums">{item.quantity}</span>
                    <button
                      onClick={() => setQuantity(item.productId, item.quantity + 1)}
                      className="p-2 hover:bg-sand-100"
                      aria-label="Sumar"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-espresso tabular-nums">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                    {item.cashPrice < item.price && (
                      <p className="text-[10px] text-gold tabular-nums">
                        {formatPrice(item.cashPrice * item.quantity)} en efectivo
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <aside className="lg:sticky lg:top-24 bg-sand-50 border border-sand-200 p-6 space-y-4">
          <h2 className="font-display text-2xl text-espresso">Resumen</h2>
          <hr className="hairline" />
          <div className="flex items-center justify-between text-sm">
            <span className="text-espresso-lighter">Subtotal</span>
            <span className="tabular-nums font-medium">{formatPrice(subtotal())}</span>
          </div>
          {cashDiscount() > 0 && (
            <div className="flex items-center justify-between text-sm text-gold">
              <span>Pagando en efectivo ahorrás</span>
              <span className="tabular-nums">-{formatPrice(cashDiscount())}</span>
            </div>
          )}
          <div className="flex items-center justify-between text-sm">
            <span className="text-espresso-lighter">Envío</span>
            <span className="text-espresso-lighter">Se calcula al confirmar</span>
          </div>
          <hr className="hairline" />
          <div className="flex items-end justify-between">
            <span className="text-xs tracking-widest uppercase text-espresso-lighter">Total estimado</span>
            <span className="font-display text-3xl tabular-nums text-espresso">
              {formatPrice(subtotal())}
            </span>
          </div>
          <p className="text-xs text-espresso-lighter">
            Incluye IVA. Envío gratis en zonas seleccionadas de Córdoba.
          </p>
          <div className="space-y-2 pt-2">
            <Link href="/checkout" className="btn-primary w-full group">
              Finalizar compra
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/tienda" className="btn-ghost w-full">
              ← Seguir comprando
            </Link>
          </div>
          <div className="text-xs text-espresso-lighter space-y-1 pt-2 border-t border-sand-200">
            <p>✓ Compra 100% segura</p>
            <p>✓ Productos 100% auténticos</p>
            <p>✓ Envío a todo el país</p>
          </div>
        </aside>
      </div>
    </section>
  );
}

function CartSkeleton() {
  return (
    <div className="container-duna py-24 flex items-center justify-center">
      <div className="w-10 h-10 border-2 border-sand-300 border-t-gold rounded-full animate-spin" />
    </div>
  );
}
