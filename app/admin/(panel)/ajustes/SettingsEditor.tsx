'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Loader2, Store, Phone, Search, Truck, DollarSign } from 'lucide-react';
import type { SiteSettings } from '@/types';
import { useToast } from '@/components/ui/Toast';
import { formatPrice } from '@/lib/utils';

export function SettingsEditor({ initial }: { initial: SiteSettings }) {
  const router = useRouter();
  const toast = useToast();
  const [form, setForm] = useState<SiteSettings>(initial);
  const [saving, setSaving] = useState(false);

  const set = <K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      toast.show('Ajustes guardados', 'success');
      router.refresh();
    } catch {
      toast.show('Error al guardar', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Marca */}
      <Card icon={Store} title="Marca" description="Nombre e identidad de tu tienda.">
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Nombre de la marca">
            <input className="input-admin" value={form.brandName} onChange={(e) => set('brandName', e.target.value)} />
          </Field>
          <Field label="Tagline">
            <input className="input-admin" value={form.tagline} onChange={(e) => set('tagline', e.target.value)} />
          </Field>
        </div>
      </Card>

      {/* Contacto */}
      <Card icon={Phone} title="Contacto" description="Estos datos aparecen en el footer y el botón de WhatsApp.">
        <div className="grid md:grid-cols-2 gap-4">
          <Field
            label="WhatsApp (mostrar)"
            hint="Formato legible, ej: +54 9 351 555 5555"
          >
            <input
              className="input-admin"
              value={form.whatsappNumber}
              onChange={(e) => {
                const v = e.target.value;
                set('whatsappNumber', v);
                set('whatsappRaw', v.replace(/[^0-9]/g, ''));
              }}
            />
          </Field>
          <Field
            label="WhatsApp (solo números)"
            hint="Se usa para armar el link a wa.me"
          >
            <input
              className="input-admin"
              value={form.whatsappRaw}
              onChange={(e) => set('whatsappRaw', e.target.value.replace(/[^0-9]/g, ''))}
            />
          </Field>
          <Field label="Instagram (usuario)">
            <input
              className="input-admin"
              value={form.instagramHandle}
              onChange={(e) => set('instagramHandle', e.target.value.replace(/^@/, ''))}
            />
          </Field>
          <Field label="Email de contacto">
            <input className="input-admin" type="email" value={form.email} onChange={(e) => set('email', e.target.value)} />
          </Field>
          <Field label="Ubicación">
            <input className="input-admin" value={form.location} onChange={(e) => set('location', e.target.value)} />
          </Field>
        </div>
      </Card>

      {/* Comercial */}
      <Card icon={DollarSign} title="Configuración comercial" description="Reglas de precios y envío.">
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="% descuento por efectivo/transferencia" hint="Se aplica sobre el precio base del producto">
            <input
              className="input-admin"
              type="number"
              min={0}
              max={50}
              step={1}
              value={form.cashDiscountPercent}
              onChange={(e) => set('cashDiscountPercent', Number(e.target.value))}
            />
          </Field>
          <Field
            label="Mínimo para envío gratis"
            hint={`Actual: ${formatPrice(form.freeShippingMinimum)}`}
          >
            <input
              className="input-admin"
              type="number"
              min={0}
              step={1000}
              value={form.freeShippingMinimum}
              onChange={(e) => set('freeShippingMinimum', Number(e.target.value))}
            />
          </Field>
          <Field label="Moneda (ISO)">
            <input className="input-admin" value={form.currency} onChange={(e) => set('currency', e.target.value.toUpperCase())} />
          </Field>
          <Field label="Locale" hint="Ej: es-AR, es-MX">
            <input className="input-admin" value={form.locale} onChange={(e) => set('locale', e.target.value)} />
          </Field>
        </div>
      </Card>

      {/* SEO */}
      <Card icon={Search} title="SEO & redes sociales" description="Metadatos para buscadores y compartidos.">
        <Field label="Título (meta title)">
          <input className="input-admin" value={form.metaTitle} onChange={(e) => set('metaTitle', e.target.value)} />
        </Field>
        <Field label="Descripción (meta description)" hint="Máximo ~160 caracteres recomendado">
          <textarea
            className="input-admin min-h-[90px] resize-y"
            value={form.metaDescription}
            onChange={(e) => set('metaDescription', e.target.value)}
          />
        </Field>
        <Field label="Imagen para compartir (og:image) — URL">
          <input
            className="input-admin"
            value={form.ogImage || ''}
            onChange={(e) => set('ogImage', e.target.value || undefined)}
            placeholder="/uploads/og.jpg"
          />
        </Field>
      </Card>

      <div className="sticky bottom-0 bg-cream/90 backdrop-blur border-t border-sand-200 py-4 -mx-4 px-4 flex justify-end">
        <button onClick={save} disabled={saving} className="btn-primary">
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Guardando...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Guardar ajustes
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function Card({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: typeof Store;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="admin-card p-6 space-y-5">
      <header className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-gold/15 text-gold flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <h2 className="font-display text-2xl text-espresso">{title}</h2>
          <p className="text-sm text-espresso-lighter">{description}</p>
        </div>
      </header>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <label className="block space-y-1">
      <span className="label-duna">{label}</span>
      {children}
      {hint && <span className="text-xs text-espresso-lighter block">{hint}</span>}
    </label>
  );
}
