'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Check, MessageCircle, Truck, Store, CreditCard, Banknote, ArrowRight, Loader2 } from 'lucide-react';
import type { SiteSettings, PaymentMethod } from '@/types';
import { useCart } from '@/store/cart-store';
import { formatPrice, cn } from '@/lib/utils';
import { useToast } from '@/components/ui/Toast';

export function CheckoutForm({ settings }: { settings: SiteSettings }) {
  const router = useRouter();
  const toast = useToast();
  const { items, subtotal, clear } = useCart();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [customer, setCustomer] = useState({ name: '', phone: '', email: '', dni: '' });
  const [shippingMethod, setShippingMethod] = useState<'envio' | 'retiro'>('envio');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Córdoba');
  const [zone, setZone] = useState('');
  const [notes, setNotes] = useState('');
  const [payment, setPayment] = useState<PaymentMethod>('transferencia');
  const [submitting, setSubmitting] = useState(false);
  const [step, setStep] = useState<'datos' | 'envio' | 'pago'>('datos');

  useEffect(() => {
    if (mounted && items.length === 0) {
      router.replace('/carrito');
    }
  }, [items.length, mounted, router]);

  if (!mounted) {
    return (
      <div className="container-duna py-24 flex justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-gold" />
      </div>
    );
  }

  const total = items.reduce((acc, i) => {
    const unit = payment === 'efectivo' || payment === 'transferencia' ? i.cashPrice : i.price;
    return acc + unit * i.quantity;
  }, 0);
  const saving = subtotal() - total;

  const submit = async () => {
    if (!customer.name || !customer.phone) {
      toast.show('Completá tu nombre y teléfono', 'error');
      setStep('datos');
      return;
    }
    if (shippingMethod === 'envio' && !address) {
      toast.show('Agregá tu dirección de envío', 'error');
      setStep('envio');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer,
          shipping: {
            method: shippingMethod,
            address: shippingMethod === 'envio' ? address : undefined,
            city: shippingMethod === 'envio' ? city : undefined,
            zone: shippingMethod === 'envio' ? zone : undefined,
            notes,
          },
          items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
          paymentMethod: payment,
          notes,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.show(data.error || 'No pudimos crear el pedido', 'error');
        setSubmitting(false);
        return;
      }
      clear();
      // Redirect to success page with WhatsApp follow-up
      router.push(`/checkout/gracias?code=${data.order.code}&id=${data.order.id}`);
    } catch (err) {
      toast.show('Error de red, intentá nuevamente', 'error');
      setSubmitting(false);
    }
  };

  return (
    <section className="container-duna py-10 lg:py-16">
      <div className="mb-10">
        <p className="eyebrow mb-2">Último paso</p>
        <h1 className="font-display text-4xl md:text-5xl text-espresso">
          Finalizá tu <span className="italic text-gold">compra</span>
        </h1>
      </div>

      {/* Steps */}
      <div className="flex items-center gap-2 sm:gap-4 mb-10 text-sm">
        <StepTab n={1} label="Datos" active={step === 'datos'} done={step !== 'datos'} onClick={() => setStep('datos')} />
        <StepChevron />
        <StepTab n={2} label="Envío" active={step === 'envio'} done={step === 'pago'} onClick={() => setStep('envio')} />
        <StepChevron />
        <StepTab n={3} label="Pago" active={step === 'pago'} done={false} onClick={() => setStep('pago')} />
      </div>

      <div className="grid lg:grid-cols-[1fr_380px] gap-10 lg:gap-14 items-start">
        <div className="space-y-8">
          {step === 'datos' && (
            <fieldset className="space-y-5 bg-cream p-6 md:p-8 border border-sand-200">
              <legend className="font-display text-2xl text-espresso mb-2">Tus datos</legend>
              <Field label="Nombre completo *">
                <input
                  className="input-duna"
                  value={customer.name}
                  onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                  placeholder="Ej: María González"
                />
              </Field>
              <div className="grid md:grid-cols-2 gap-4">
                <Field label="WhatsApp / Teléfono *">
                  <input
                    className="input-duna"
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    placeholder="+54 9 351 ..."
                    inputMode="tel"
                  />
                </Field>
                <Field label="DNI (opcional)">
                  <input
                    className="input-duna"
                    value={customer.dni}
                    onChange={(e) => setCustomer({ ...customer, dni: e.target.value })}
                    placeholder="Para facturación"
                    inputMode="numeric"
                  />
                </Field>
              </div>
              <Field label="Email (opcional)">
                <input
                  className="input-duna"
                  type="email"
                  value={customer.email}
                  onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                  placeholder="hola@email.com"
                />
              </Field>
              <button
                type="button"
                onClick={() => setStep('envio')}
                className="btn-primary w-full sm:w-auto"
              >
                Continuar con envío <ArrowRight className="w-4 h-4" />
              </button>
            </fieldset>
          )}

          {step === 'envio' && (
            <fieldset className="space-y-5 bg-cream p-6 md:p-8 border border-sand-200">
              <legend className="font-display text-2xl text-espresso mb-2">Entrega</legend>
              <div className="grid sm:grid-cols-2 gap-4">
                <OptionCard
                  icon={Truck}
                  title="Envío a domicilio"
                  description="Córdoba Capital o al interior"
                  selected={shippingMethod === 'envio'}
                  onClick={() => setShippingMethod('envio')}
                />
                <OptionCard
                  icon={Store}
                  title="Retiro"
                  description="Sin cargo en Córdoba"
                  selected={shippingMethod === 'retiro'}
                  onClick={() => setShippingMethod('retiro')}
                />
              </div>

              {shippingMethod === 'envio' && (
                <>
                  <Field label="Dirección *">
                    <input
                      className="input-duna"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Calle, número, depto"
                    />
                  </Field>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Field label="Ciudad / Localidad">
                      <input
                        className="input-duna"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Córdoba"
                      />
                    </Field>
                    <Field label="Barrio / Zona">
                      <input
                        className="input-duna"
                        value={zone}
                        onChange={(e) => setZone(e.target.value)}
                        placeholder="Nueva Córdoba"
                      />
                    </Field>
                  </div>
                  <p className="text-xs text-espresso-lighter">
                    El costo de envío se calcula y confirma por WhatsApp al preparar tu pedido.
                  </p>
                </>
              )}

              {shippingMethod === 'retiro' && (
                <p className="text-sm text-espresso-lighter bg-sand-50 p-4 border border-sand-200">
                  Una vez confirmado tu pedido, coordinamos punto de retiro por WhatsApp. Sin costo.
                </p>
              )}

              <Field label="Notas (opcional)">
                <textarea
                  className="input-duna min-h-[80px] resize-y"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Horario preferido, referencias, pedido especial..."
                />
              </Field>
              <div className="flex flex-col sm:flex-row gap-3">
                <button type="button" onClick={() => setStep('datos')} className="btn-ghost">
                  ← Atrás
                </button>
                <button type="button" onClick={() => setStep('pago')} className="btn-primary">
                  Continuar con pago <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </fieldset>
          )}

          {step === 'pago' && (
            <fieldset className="space-y-5 bg-cream p-6 md:p-8 border border-sand-200">
              <legend className="font-display text-2xl text-espresso mb-2">Forma de pago</legend>
              <div className="grid gap-3">
                <PayOption
                  selected={payment === 'transferencia'}
                  onClick={() => setPayment('transferencia')}
                  icon={Banknote}
                  title="Transferencia bancaria"
                  description="10% OFF — Te pasamos el CBU por WhatsApp"
                  badge="10% OFF"
                />
                <PayOption
                  selected={payment === 'efectivo'}
                  onClick={() => setPayment('efectivo')}
                  icon={Banknote}
                  title="Efectivo"
                  description="10% OFF — Contra entrega o en retiro"
                  badge="10% OFF"
                />
                <PayOption
                  selected={payment === 'mercadopago'}
                  onClick={() => setPayment('mercadopago')}
                  icon={CreditCard}
                  title="Mercado Pago"
                  description="Link de pago por WhatsApp — hasta 3 cuotas sin interés"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button type="button" onClick={() => setStep('envio')} className="btn-ghost">
                  ← Atrás
                </button>
                <button
                  type="button"
                  onClick={submit}
                  disabled={submitting}
                  className="btn-primary"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Procesando...
                    </>
                  ) : (
                    <>
                      <MessageCircle className="w-4 h-4" />
                      Confirmar y enviar por WhatsApp
                    </>
                  )}
                </button>
              </div>
            </fieldset>
          )}
        </div>

        {/* Order summary */}
        <aside className="lg:sticky lg:top-24 bg-sand-50 border border-sand-200 p-6 space-y-4">
          <h2 className="font-display text-xl text-espresso">Tu pedido</h2>
          <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
            {items.map((it) => (
              <div key={it.productId} className="flex justify-between gap-3 text-sm">
                <div className="min-w-0">
                  <p className="font-medium text-espresso truncate">{it.model}</p>
                  <p className="text-xs text-espresso-lighter">
                    {it.brand} · {it.size} · x{it.quantity}
                  </p>
                </div>
                <p className="tabular-nums text-espresso shrink-0">
                  {formatPrice(
                    (payment === 'efectivo' || payment === 'transferencia' ? it.cashPrice : it.price) *
                      it.quantity,
                  )}
                </p>
              </div>
            ))}
          </div>
          <hr className="hairline" />
          <div className="space-y-2 text-sm">
            <Row label="Subtotal" value={formatPrice(subtotal())} />
            {saving > 0 && <Row label="Descuento efectivo/transf." value={`-${formatPrice(saving)}`} accent />}
            <Row label="Envío" value="A coordinar" muted />
          </div>
          <hr className="hairline" />
          <div className="flex items-end justify-between">
            <span className="text-xs tracking-widest uppercase text-espresso-lighter">Total</span>
            <span className="font-display text-3xl tabular-nums text-espresso">{formatPrice(total)}</span>
          </div>
          <Link href="/carrito" className="text-xs text-espresso-lighter hover:text-gold block text-center pt-2">
            ← Editar carrito
          </Link>
        </aside>
      </div>
    </section>
  );
}

function StepTab({
  n,
  label,
  active,
  done,
  onClick,
}: {
  n: number;
  label: string;
  active: boolean;
  done: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex items-center gap-2 px-3 py-2 transition-colors',
        active ? 'text-gold' : done ? 'text-espresso' : 'text-espresso-lighter',
      )}
    >
      <span
        className={cn(
          'w-6 h-6 rounded-full flex items-center justify-center text-xs border',
          active ? 'bg-gold text-cream border-gold' : done ? 'bg-espresso text-cream border-espresso' : 'border-sand-400',
        )}
      >
        {done ? <Check className="w-3 h-3" /> : n}
      </span>
      <span className="hidden sm:inline tracking-wider uppercase text-xs">{label}</span>
    </button>
  );
}

function StepChevron() {
  return <span className="text-sand-400">—</span>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="label-duna">{label}</span>
      {children}
    </label>
  );
}

function OptionCard({
  icon: Icon,
  title,
  description,
  selected,
  onClick,
}: {
  icon: typeof Truck;
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'p-5 border text-left transition-all flex gap-4',
        selected ? 'border-gold bg-gold/5' : 'border-sand-300 hover:border-espresso',
      )}
    >
      <div className={cn('w-10 h-10 rounded-full flex items-center justify-center shrink-0', selected ? 'bg-gold text-cream' : 'bg-sand-100 text-espresso')}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="font-medium text-espresso">{title}</p>
        <p className="text-sm text-espresso-lighter">{description}</p>
      </div>
    </button>
  );
}

function PayOption({
  selected,
  onClick,
  icon: Icon,
  title,
  description,
  badge,
}: {
  selected: boolean;
  onClick: () => void;
  icon: typeof Banknote;
  title: string;
  description: string;
  badge?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex items-center gap-4 p-4 border text-left transition-all w-full',
        selected ? 'border-gold bg-gold/5' : 'border-sand-300 hover:border-espresso',
      )}
    >
      <div className={cn('w-10 h-10 rounded-full flex items-center justify-center shrink-0', selected ? 'bg-gold text-cream' : 'bg-sand-100 text-espresso')}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-3">
          <p className="font-medium text-espresso">{title}</p>
          {badge && <span className="text-[9px] tracking-widest3 uppercase bg-gold text-cream px-1.5 py-0.5">{badge}</span>}
        </div>
        <p className="text-xs text-espresso-lighter">{description}</p>
      </div>
      <span className={cn('w-5 h-5 border rounded-full flex items-center justify-center transition', selected ? 'border-gold bg-gold' : 'border-sand-400')}>
        {selected && <Check className="w-3 h-3 text-cream" />}
      </span>
    </button>
  );
}

function Row({ label, value, muted, accent }: { label: string; value: string; muted?: boolean; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className={cn(muted ? 'text-espresso-lighter' : 'text-espresso')}>{label}</span>
      <span className={cn('tabular-nums', accent ? 'text-gold' : 'text-espresso', muted && 'text-espresso-lighter')}>
        {value}
      </span>
    </div>
  );
}
