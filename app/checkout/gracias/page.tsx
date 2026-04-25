import Link from 'next/link';
import { CheckCircle2, MessageCircle, Home } from 'lucide-react';
import { getOrderById, getSettings } from '@/lib/db';
import { buildOrderConfirmationMessage, buildWhatsAppUrl } from '@/lib/whatsapp';
import { formatPrice, formatDateTime } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default async function GraciasPage({
  searchParams,
}: {
  searchParams: { code?: string; id?: string };
}) {
  const settings = await getSettings();
  const order = searchParams.id ? await getOrderById(searchParams.id) : null;

  const waMessage = order ? buildOrderConfirmationMessage(order, settings) : null;
  const waUrl = waMessage ? buildWhatsAppUrl(settings.whatsappRaw, waMessage) : '#';

  return (
    <section className="container-duna py-16 lg:py-24 max-w-3xl">
      <div className="text-center space-y-6 mb-12">
        <div className="w-20 h-20 mx-auto rounded-full bg-gold/15 flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10 text-gold" />
        </div>
        <p className="eyebrow">Pedido recibido</p>
        <h1 className="font-display text-4xl md:text-5xl text-espresso text-balance">
          ¡Gracias por tu <span className="italic text-gold">compra!</span>
        </h1>
        <p className="text-espresso-lighter max-w-xl mx-auto">
          {order ? (
            <>Tu pedido <span className="font-medium text-espresso">#{order.code}</span> fue registrado. En breve te contactamos por WhatsApp para confirmar el envío y el pago.</>
          ) : (
            'Tu pedido fue registrado correctamente. En breve te contactamos por WhatsApp.'
          )}
        </p>
      </div>

      {order && (
        <div className="bg-cream border border-sand-200 p-6 md:p-8 mb-8 space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-3 pb-5 border-b border-sand-200">
            <div>
              <p className="text-[10px] tracking-widest3 uppercase text-espresso-lighter">Pedido</p>
              <p className="font-display text-2xl text-espresso">#{order.code}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] tracking-widest3 uppercase text-espresso-lighter">Fecha</p>
              <p className="text-sm text-espresso">{formatDateTime(order.createdAt)}</p>
            </div>
          </div>

          <div>
            <h3 className="text-xs tracking-widest uppercase text-espresso-lighter mb-3">Detalle</h3>
            <div className="space-y-2">
              {order.items.map((it) => (
                <div key={it.productId} className="flex justify-between text-sm">
                  <span className="text-espresso">{it.brand} — {it.model} ({it.size}) x{it.quantity}</span>
                  <span className="tabular-nums text-espresso">{formatPrice(it.subtotal)}</span>
                </div>
              ))}
            </div>
          </div>

          <hr className="hairline" />
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-espresso-lighter">Subtotal</span>
              <span className="tabular-nums">{formatPrice(order.subtotal)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-gold">
                <span>Descuento</span>
                <span className="tabular-nums">-{formatPrice(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between font-medium pt-2 border-t border-sand-200">
              <span className="text-espresso">Total</span>
              <span className="tabular-nums text-espresso">{formatPrice(order.total)}</span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-sand-200 text-sm">
            <div>
              <p className="text-[10px] tracking-widest3 uppercase text-espresso-lighter mb-1">Cliente</p>
              <p className="text-espresso">{order.customer.name}</p>
              <p className="text-espresso-lighter">{order.customer.phone}</p>
              {order.customer.email && <p className="text-espresso-lighter text-xs">{order.customer.email}</p>}
            </div>
            <div>
              <p className="text-[10px] tracking-widest3 uppercase text-espresso-lighter mb-1">Entrega</p>
              {order.shipping.method === 'envio' ? (
                <>
                  <p className="text-espresso">Envío a domicilio</p>
                  <p className="text-espresso-lighter text-xs">{order.shipping.address}, {order.shipping.city}</p>
                </>
              ) : (
                <p className="text-espresso">Retiro en punto acordado</p>
              )}
              <p className="text-espresso-lighter text-xs mt-1">Pago: {order.paymentMethod}</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-gold/10 border border-gold/30 p-6 md:p-8 text-center space-y-4 mb-8">
        <MessageCircle className="w-10 h-10 text-gold mx-auto" />
        <h2 className="font-display text-2xl text-espresso">Un último paso</h2>
        <p className="text-espresso-lighter max-w-md mx-auto">
          Enviá la confirmación de tu pedido por WhatsApp para que lo preparemos en 24–48hs y te pasemos los datos de pago.
        </p>
        <a href={waUrl} target="_blank" rel="noreferrer" className="btn-gold inline-flex">
          <MessageCircle className="w-4 h-4" />
          Enviar confirmación por WhatsApp
        </a>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-3">
        <Link href="/" className="btn-secondary">
          <Home className="w-4 h-4" />
          Volver al inicio
        </Link>
        <Link href="/tienda" className="btn-ghost">Seguir explorando →</Link>
      </div>
    </section>
  );
}
