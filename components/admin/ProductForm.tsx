'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Upload, X, Loader2, Save, Trash2 } from 'lucide-react';
import type { Product } from '@/types';
import { useToast } from '@/components/ui/Toast';
import { slugify } from '@/lib/utils';

export function ProductForm({ product }: { product?: Product }) {
  const router = useRouter();
  const toast = useToast();
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    brand: product?.brand || '',
    classification: product?.classification || 'ALTERNATIVA',
    model: product?.model || '',
    gender: product?.gender || 'UNISEX',
    size: product?.size || '100 ml',
    fragranceType: product?.fragranceType || 'Eau de Parfum',
    price: product?.price ?? 0,
    cashPrice: product?.cashPrice ?? 0,
    stock: product?.stock ?? 0,
    notes: product?.notes || '',
    family: product?.family || '',
    topNotes: product?.topNotes || '',
    featured: product?.featured || false,
    active: product?.active ?? true,
    images: product?.images || [],
    slug: product?.slug || '',
  });

  const setField = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const body = new FormData();
      body.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body });
      const data = await res.json();
      if (!res.ok) {
        toast.show(data.error || 'Error al subir', 'error');
        return;
      }
      setField('images', [...form.images, data.url]);
      toast.show('Imagen subida', 'success');
    } catch {
      toast.show('Error al subir', 'error');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (url: string) => {
    setField('images', form.images.filter((u) => u !== url));
  };

  const save = async () => {
    if (!form.brand || !form.model) {
      toast.show('Marca y modelo son requeridos', 'error');
      return;
    }
    setSaving(true);
    try {
      const payload = {
        ...form,
        slug: form.slug || slugify(`${form.brand}-${form.model}-${form.size}`),
        price: Number(form.price),
        cashPrice: Number(form.cashPrice) || Math.round(Number(form.price) * 0.9),
        stock: Number(form.stock),
      };
      const url = product ? `/api/products/${product.id}` : '/api/products';
      const method = product ? 'PATCH' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.show(data.error || 'Error al guardar', 'error');
        setSaving(false);
        return;
      }
      toast.show(product ? 'Producto actualizado' : 'Producto creado', 'success');
      if (product) {
        router.refresh();
      } else {
        router.push(`/admin/productos/${data.product.id}`);
      }
    } catch {
      toast.show('Error de red', 'error');
    } finally {
      setSaving(false);
    }
  };

  const del = async () => {
    if (!product) return;
    if (!confirm(`¿Eliminar "${product.brand} ${product.model}"?`)) return;
    try {
      const res = await fetch(`/api/products/${product.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      toast.show('Producto eliminado', 'success');
      router.push('/admin/productos');
    } catch {
      toast.show('Error al eliminar', 'error');
    }
  };

  return (
    <div className="grid lg:grid-cols-[1fr_340px] gap-6">
      {/* Main form */}
      <div className="space-y-6">
        <FormCard title="Información básica">
          <Row>
            <Field label="Marca *">
              <input className="input-admin" value={form.brand} onChange={(e) => setField('brand', e.target.value)} placeholder="Ej: Lattafa" />
            </Field>
            <Field label="Modelo *">
              <input className="input-admin" value={form.model} onChange={(e) => setField('model', e.target.value)} placeholder="Ej: Khamrah" />
            </Field>
          </Row>
          <Row>
            <Field label="Clasificación">
              <select className="input-admin" value={form.classification} onChange={(e) => setField('classification', e.target.value as Product['classification'])}>
                <option value="ALTERNATIVA">Alternativa</option>
                <option value="ORIGINAL">Original</option>
              </select>
            </Field>
            <Field label="Género">
              <select className="input-admin" value={form.gender} onChange={(e) => setField('gender', e.target.value as Product['gender'])}>
                <option value="UNISEX">Unisex</option>
                <option value="MASCULINO">Masculino</option>
                <option value="FEMENINO">Femenino</option>
              </select>
            </Field>
          </Row>
          <Row>
            <Field label="Tamaño">
              <input className="input-admin" value={form.size} onChange={(e) => setField('size', e.target.value)} placeholder="100 ml" />
            </Field>
            <Field label="Tipo">
              <input className="input-admin" value={form.fragranceType} onChange={(e) => setField('fragranceType', e.target.value)} placeholder="Eau de Parfum" />
            </Field>
          </Row>
          <Field label="Slug (URL)">
            <input
              className="input-admin"
              value={form.slug}
              onChange={(e) => setField('slug', e.target.value)}
              placeholder={slugify(`${form.brand}-${form.model}-${form.size}`)}
            />
            <p className="text-xs text-espresso-lighter mt-1">
              URL: /producto/{form.slug || slugify(`${form.brand}-${form.model}-${form.size}`)}
            </p>
          </Field>
        </FormCard>

        <FormCard title="Precios y stock">
          <Row>
            <Field label="Precio lista *">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-espresso-lighter">$</span>
                <input
                  type="number"
                  className="input-admin pl-7"
                  value={form.price}
                  onChange={(e) => setField('price', Number(e.target.value))}
                  min={0}
                />
              </div>
            </Field>
            <Field label="Precio efectivo / transferencia">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-espresso-lighter">$</span>
                <input
                  type="number"
                  className="input-admin pl-7"
                  value={form.cashPrice}
                  onChange={(e) => setField('cashPrice', Number(e.target.value))}
                  min={0}
                />
              </div>
              <button
                type="button"
                onClick={() => setField('cashPrice', Math.round(Number(form.price) * 0.9))}
                className="text-xs text-gold hover:text-espresso mt-1"
              >
                Sugerir -10%
              </button>
            </Field>
          </Row>
          <Field label="Stock disponible">
            <input
              type="number"
              className="input-admin"
              value={form.stock}
              onChange={(e) => setField('stock', Number(e.target.value))}
              min={0}
            />
          </Field>
        </FormCard>

        <FormCard title="Descripción y notas">
          <Field label="Notas olfativas (texto libre)">
            <textarea
              className="input-admin min-h-[100px] resize-y"
              value={form.notes}
              onChange={(e) => setField('notes', e.target.value)}
              placeholder="Ej: Oriental especiado, Salida: canela, nuez moscada. Fondo: oud, ámbar..."
            />
          </Field>
          <Row>
            <Field label="Familia olfativa">
              <input className="input-admin" value={form.family} onChange={(e) => setField('family', e.target.value)} placeholder="Oriental amaderado" />
            </Field>
            <Field label="Notas destacadas">
              <input className="input-admin" value={form.topNotes} onChange={(e) => setField('topNotes', e.target.value)} placeholder="Canela, oud, vainilla" />
            </Field>
          </Row>
        </FormCard>

        <FormCard title="Imágenes">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {form.images.map((url) => (
              <div key={url} className="relative aspect-square bg-sand-100 border border-sand-200 group">
                <Image src={url} alt="" fill sizes="150px" className="object-cover" />
                <button
                  onClick={() => removeImage(url)}
                  className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-600 text-cream flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Quitar imagen"
                  type="button"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
            <label className={`aspect-square border-2 border-dashed border-sand-300 flex flex-col items-center justify-center gap-2 text-xs text-espresso-lighter hover:border-gold hover:text-gold cursor-pointer transition-colors ${uploading && 'opacity-50'}`}>
              <input
                type="file"
                accept="image/*"
                hidden
                disabled={uploading}
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleUpload(f);
                  e.target.value = '';
                }}
              />
              {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
              Subir imagen
            </label>
          </div>
          <p className="text-xs text-espresso-lighter mt-3">
            Formatos: JPG, PNG, WEBP, AVIF · máx 8MB · Recomendado: 800×1000px
          </p>
        </FormCard>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        <FormCard title="Estado">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.active}
              onChange={(e) => setField('active', e.target.checked)}
              className="mt-1 accent-gold"
            />
            <div>
              <p className="font-medium text-espresso">Publicado</p>
              <p className="text-xs text-espresso-lighter">Visible en la tienda para clientes</p>
            </div>
          </label>
          <label className="flex items-start gap-3 cursor-pointer mt-4 pt-4 border-t border-sand-200">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => setField('featured', e.target.checked)}
              className="mt-1 accent-gold"
            />
            <div>
              <p className="font-medium text-espresso">Destacado</p>
              <p className="text-xs text-espresso-lighter">Aparece en &ldquo;Favoritas de temporada&rdquo;</p>
            </div>
          </label>
        </FormCard>

        <div className="sticky top-20 space-y-3">
          <button onClick={save} disabled={saving} className="btn-primary w-full">
            {saving ? <><Loader2 className="w-4 h-4 animate-spin" />Guardando...</> : <><Save className="w-4 h-4" />{product ? 'Guardar cambios' : 'Crear producto'}</>}
          </button>
          {product && (
            <button
              onClick={del}
              className="btn-ghost w-full text-red-700 hover:text-red-800 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
              Eliminar producto
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function FormCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="admin-card p-5 md:p-6 space-y-4">
      <h3 className="font-display text-xl text-espresso">{title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="grid md:grid-cols-2 gap-4">{children}</div>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="label-duna">{label}</span>
      {children}
    </label>
  );
}
