'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { useCart } from '@/store/cart-store';
import { cn, formatPrice } from '@/lib/utils';
import { ProductPlaceholder } from '@/components/products/ProductPlaceholder';

export function CartDrawer() {
  const { items, isOpen, close, remove, setQuantity, subtotal, cashDiscount, totalItems } = useCart();

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }, [isOpen]);

  return (
    <div className={cn('fixed inset-0 z-50 transition-all duration-500', isOpen ? 'visible' : 'invisible')}>
      <div
        className={cn('absolute inset-0 bg-espresso/50 backdrop-blur-sm transition-opacity', isOpen ? 'opacity-100' : 'opacity-0')}
        onClick={close}
      />
      <aside
        className={cn(
          'absolute right-0 top-0 bottom-0 w-full sm:w-[460px] bg-cream flex flex-col shadow-elegant transition-transform duration-500',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <header className="flex items-center justify-between px-6 h-20 border-b border-sand-200">
          <div>
            <p className="text-xs tracking-widest uppercase text-espresso-lighter">Tu selección</p>
            <h3 className="font-display text-2xl text-espresso">
              Carrito {totalItems() > 0 && <span className="text-gold">({totalItems()})</span>}
            </h3>
          </div>
          <button onClick={close} aria-label="Cerrar carrito" className="text-espresso hover:text-gold">
            <X className="w-5 h-5" />
          </button>
        </header>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-5 p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-sand-100 flex items-center justify-center">
              <ShoppingBag className="w-8 h-8 text-gold" />
            </div>
            <div>
              <p className="font-display text-2xl text-espresso mb-1">Tu carrito está vacío</p>
              <p className="text-sm text-espresso-lighter max-w-xs">
                Explorá nuestra colección y agregá las fragancias que te hagan sentir único.
              </p>
            </div>
            <Link href="/tienda" onClick={close} className="btn-primary mt-2">
              Explorar tienda
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.map((item) => (
                <div key={item.productId} className="flex gap-4 py-3 border-b border-sand-200 last:border-0">
                  <Link
                    href={`/producto/${item.slug}`}
                    onClick={close}
                    className="relative w-20 h-24 bg-sand-100 overflow-hidden shrink-0"
                  >
                    {item.image ? (
                      <Image src={item.image} alt={item.model} fill sizes="80px" className="object-cover" />
                    ) : (
                      <ProductPlaceholder brand={item.brand} />
                    )}
                  </Link>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] tracking-widest uppercase text-espresso-lighter">{item.brand}</p>
                    <Link
                      href={`/producto/${item.slug}`}
                      onClick={close}
                      className="font-display text-lg text-espresso leading-tight block truncate hover:text-gold"
                    >
                      {item.model}
                    </Link>
                    <p className="text-xs text-espresso-lighter">{item.size}</p>
                    <div className="flex items-end justify-between mt-2">
                      <div className="flex items-center border border-sand-300">
                        <button
                          onClick={() => setQuantity(item.productId, item.quantity - 1)}
                          className="p-1.5 hover:bg-sand-100"
                          aria-label="Restar"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-sm tabular-nums">{item.quantity}</span>
                        <button
                          onClick={() => setQuantity(item.productId, item.quantity + 1)}
                          className="p-1.5 hover:bg-sand-100"
                          aria-label="Sumar"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="font-medium text-espresso">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => remove(item.productId)}
                    className="text-espresso-lighter hover:text-red-700 self-start"
                    aria-label="Eliminar"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <footer className="border-t border-sand-200 px-6 py-5 space-y-3 bg-sand-50">
              <div className="flex items-center justify-between text-sm text-espresso-lighter">
                <span>Subtotal</span>
                <span className="tabular-nums">{formatPrice(subtotal())}</span>
              </div>
              {cashDiscount() > 0 && (
                <div className="flex items-center justify-between text-sm text-gold">
                  <span>Pagando en efectivo ahorrás</span>
                  <span className="tabular-nums">-{formatPrice(cashDiscount())}</span>
                </div>
              )}
              <p className="text-xs text-espresso-lighter">
                Envío gratis en zonas seleccionadas de Córdoba. Al interior cotizamos al confirmar.
              </p>
              <div className="space-y-2 pt-2">
                <Link href="/checkout" onClick={close} className="btn-primary w-full">
                  Finalizar compra
                </Link>
                <Link href="/carrito" onClick={close} className="btn-secondary w-full">
                  Ver carrito
                </Link>
              </div>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
