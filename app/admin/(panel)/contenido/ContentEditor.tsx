'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Save,
  Loader2,
  Plus,
  Trash2,
  Upload,
  X,
  Megaphone,
  Image as ImageIcon,
  BookOpen,
  Sparkles,
  Grid3x3,
  Heart,
  Users,
  MessageCircle,
  Truck,
  HelpCircle,
  ArrowDownCircle,
  ArrowUpCircle,
} from 'lucide-react';
import type { SiteContent } from '@/types';
import { useToast } from '@/components/ui/Toast';

type Section =
  | 'announcement'
  | 'hero'
  | 'story'
  | 'features'
  | 'categories'
  | 'cta'
  | 'about'
  | 'contact'
  | 'shipping'
  | 'faq';

const TABS: Array<{ key: Section; label: string; icon: typeof Megaphone }> = [
  { key: 'announcement', label: 'Banner superior', icon: Megaphone },
  { key: 'hero', label: 'Hero principal', icon: ImageIcon },
  { key: 'story', label: 'Nuestra historia', icon: BookOpen },
  { key: 'features', label: 'Beneficios', icon: Sparkles },
  { key: 'categories', label: 'Categorías', icon: Grid3x3 },
  { key: 'cta', label: 'Call to action', icon: Heart },
  { key: 'about', label: 'Nosotros', icon: Users },
  { key: 'contact', label: 'Contacto', icon: MessageCircle },
  { key: 'shipping', label: 'Envíos', icon: Truck },
  { key: 'faq', label: 'Preguntas', icon: HelpCircle },
];

export function ContentEditor({ initial }: { initial: SiteContent }) {
  const router = useRouter();
  const toast = useToast();
  const [content, setContent] = useState<SiteContent>(initial);
  const [section, setSection] = useState<Section>('announcement');
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });
      if (!res.ok) throw new Error();
      toast.show('Contenido actualizado', 'success');
      router.refresh();
    } catch {
      toast.show('Error al guardar', 'error');
    } finally {
      setSaving(false);
    }
  };

  const update = <K extends Section>(key: K, value: SiteContent[K]) => {
    setContent((c) => ({ ...c, [key]: value }));
  };

  return (
    <div className="grid lg:grid-cols-[240px_1fr] gap-6">
      {/* Sidebar */}
      <nav className="admin-card p-3 h-max lg:sticky lg:top-6 space-y-1">
        {TABS.map((t) => {
          const Icon = t.icon;
          const active = section === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setSection(t.key)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded text-sm text-left transition-colors ${
                active
                  ? 'bg-espresso text-cream'
                  : 'text-espresso hover:bg-sand-100'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span className="truncate">{t.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Editor */}
      <div className="space-y-6">
        {section === 'announcement' && (
          <AnnouncementEditor value={content.announcement} onChange={(v) => update('announcement', v)} />
        )}
        {section === 'hero' && <HeroEditor value={content.hero} onChange={(v) => update('hero', v)} />}
        {section === 'story' && <StoryEditor value={content.story} onChange={(v) => update('story', v)} />}
        {section === 'features' && (
          <FeaturesEditor value={content.features} onChange={(v) => update('features', v)} />
        )}
        {section === 'categories' && (
          <CategoriesEditor value={content.categories} onChange={(v) => update('categories', v)} />
        )}
        {section === 'cta' && <CTAEditor value={content.cta} onChange={(v) => update('cta', v)} />}
        {section === 'about' && <AboutEditor value={content.about} onChange={(v) => update('about', v)} />}
        {section === 'contact' && (
          <ContactEditor value={content.contact} onChange={(v) => update('contact', v)} />
        )}
        {section === 'shipping' && (
          <ShippingEditor value={content.shipping} onChange={(v) => update('shipping', v)} />
        )}
        {section === 'faq' && <FaqEditor value={content.faq} onChange={(v) => update('faq', v)} />}

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
                Guardar cambios
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────── helpers ──────────────────────────────

function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label className="block space-y-1">
      <span className="label-duna">{label}</span>
      {children}
      {hint && <span className="text-xs text-espresso-lighter">{hint}</span>}
    </label>
  );
}

function SectionCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="admin-card p-6 space-y-5">
      <div>
        <h2 className="font-display text-2xl text-espresso">{title}</h2>
        {description && <p className="text-sm text-espresso-lighter mt-1">{description}</p>}
      </div>
      {children}
    </div>
  );
}

function MoveButtons({
  onUp,
  onDown,
  onRemove,
  canUp,
  canDown,
}: {
  onUp: () => void;
  onDown: () => void;
  onRemove: () => void;
  canUp: boolean;
  canDown: boolean;
}) {
  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={onUp}
        disabled={!canUp}
        className="p-1.5 rounded hover:bg-sand-100 text-espresso-lighter disabled:opacity-30"
        title="Subir"
      >
        <ArrowUpCircle className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={onDown}
        disabled={!canDown}
        className="p-1.5 rounded hover:bg-sand-100 text-espresso-lighter disabled:opacity-30"
        title="Bajar"
      >
        <ArrowDownCircle className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={onRemove}
        className="p-1.5 rounded hover:bg-red-50 text-red-700"
        title="Eliminar"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}

function move<T>(arr: T[], i: number, dir: -1 | 1): T[] {
  const j = i + dir;
  if (j < 0 || j >= arr.length) return arr;
  const next = [...arr];
  [next[i], next[j]] = [next[j], next[i]];
  return next;
}

function ImageUploadField({
  value,
  onChange,
  label,
}: {
  value?: string;
  onChange: (v: string | undefined) => void;
  label: string;
}) {
  const toast = useToast();
  const [uploading, setUploading] = useState(false);

  const upload = async (file: File) => {
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
      onChange(data.url);
    } catch {
      toast.show('Error al subir', 'error');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <span className="label-duna">{label}</span>
      <div className="flex items-start gap-3">
        {value ? (
          <div className="relative w-32 h-32 rounded overflow-hidden border border-sand-200 bg-sand-50">
            <Image src={value} alt="" fill className="object-cover" sizes="128px" />
            <button
              type="button"
              onClick={() => onChange(undefined)}
              className="absolute top-1 right-1 p-1 rounded-full bg-white/90 hover:bg-white text-red-700 shadow"
              title="Quitar"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <label className="w-32 h-32 rounded border-2 border-dashed border-sand-300 flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-gold hover:bg-gold/5 text-espresso-lighter text-xs">
            {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
            <span>{uploading ? 'Subiendo...' : 'Subir imagen'}</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])}
              disabled={uploading}
            />
          </label>
        )}
      </div>
    </div>
  );
}

// ────────────────────────────── section editors ──────────────────────────────

function AnnouncementEditor({
  value,
  onChange,
}: {
  value: SiteContent['announcement'];
  onChange: (v: SiteContent['announcement']) => void;
}) {
  return (
    <SectionCard
      title="Banner superior"
      description="Mensajes rotativos que aparecen en la parte superior del sitio."
    >
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={value.enabled}
          onChange={(e) => onChange({ ...value, enabled: e.target.checked })}
          className="w-4 h-4 accent-gold"
        />
        <span className="text-sm text-espresso">Mostrar banner en el sitio</span>
      </label>

      <div className="space-y-2">
        <span className="label-duna">Mensajes</span>
        {value.items.map((item, i) => (
          <div key={i} className="flex gap-2">
            <input
              className="input-admin flex-1"
              value={item}
              onChange={(e) => {
                const next = [...value.items];
                next[i] = e.target.value;
                onChange({ ...value, items: next });
              }}
            />
            <MoveButtons
              onUp={() => onChange({ ...value, items: move(value.items, i, -1) })}
              onDown={() => onChange({ ...value, items: move(value.items, i, 1) })}
              onRemove={() =>
                onChange({ ...value, items: value.items.filter((_, k) => k !== i) })
              }
              canUp={i > 0}
              canDown={i < value.items.length - 1}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange({ ...value, items: [...value.items, ''] })}
          className="btn-ghost text-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          Agregar mensaje
        </button>
      </div>
    </SectionCard>
  );
}

function HeroEditor({
  value,
  onChange,
}: {
  value: SiteContent['hero'];
  onChange: (v: SiteContent['hero']) => void;
}) {
  return (
    <SectionCard
      title="Hero principal"
      description="Primera sección de la home — lo primero que ve tu cliente."
    >
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Etiqueta superior">
          <input
            className="input-admin"
            value={value.eyebrow}
            onChange={(e) => onChange({ ...value, eyebrow: e.target.value })}
          />
        </Field>
        <Field label="Título principal">
          <input
            className="input-admin"
            value={value.title}
            onChange={(e) => onChange({ ...value, title: e.target.value })}
          />
        </Field>
      </div>
      <Field label="Subtítulo">
        <textarea
          className="input-admin min-h-[80px] resize-y"
          value={value.subtitle}
          onChange={(e) => onChange({ ...value, subtitle: e.target.value })}
        />
      </Field>
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Botón principal — texto">
          <input
            className="input-admin"
            value={value.ctaPrimary.label}
            onChange={(e) =>
              onChange({ ...value, ctaPrimary: { ...value.ctaPrimary, label: e.target.value } })
            }
          />
        </Field>
        <Field label="Botón principal — enlace">
          <input
            className="input-admin"
            value={value.ctaPrimary.href}
            onChange={(e) =>
              onChange({ ...value, ctaPrimary: { ...value.ctaPrimary, href: e.target.value } })
            }
          />
        </Field>
        <Field label="Botón secundario — texto">
          <input
            className="input-admin"
            value={value.ctaSecondary.label}
            onChange={(e) =>
              onChange({ ...value, ctaSecondary: { ...value.ctaSecondary, label: e.target.value } })
            }
          />
        </Field>
        <Field label="Botón secundario — enlace">
          <input
            className="input-admin"
            value={value.ctaSecondary.href}
            onChange={(e) =>
              onChange({ ...value, ctaSecondary: { ...value.ctaSecondary, href: e.target.value } })
            }
          />
        </Field>
      </div>
      <ImageUploadField
        label="Imagen de fondo (opcional)"
        value={value.backgroundImage}
        onChange={(v) => onChange({ ...value, backgroundImage: v })}
      />
    </SectionCard>
  );
}

function StoryEditor({
  value,
  onChange,
}: {
  value: SiteContent['story'];
  onChange: (v: SiteContent['story']) => void;
}) {
  return (
    <SectionCard title="Nuestra historia" description="Sección editorial en la home.">
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Etiqueta">
          <input
            className="input-admin"
            value={value.eyebrow}
            onChange={(e) => onChange({ ...value, eyebrow: e.target.value })}
          />
        </Field>
        <Field label="Título">
          <input
            className="input-admin"
            value={value.title}
            onChange={(e) => onChange({ ...value, title: e.target.value })}
          />
        </Field>
      </div>
      <div className="space-y-2">
        <span className="label-duna">Párrafos</span>
        {value.paragraphs.map((p, i) => (
          <div key={i} className="flex gap-2 items-start">
            <textarea
              className="input-admin flex-1 min-h-[90px] resize-y"
              value={p}
              onChange={(e) => {
                const next = [...value.paragraphs];
                next[i] = e.target.value;
                onChange({ ...value, paragraphs: next });
              }}
            />
            <MoveButtons
              onUp={() => onChange({ ...value, paragraphs: move(value.paragraphs, i, -1) })}
              onDown={() => onChange({ ...value, paragraphs: move(value.paragraphs, i, 1) })}
              onRemove={() =>
                onChange({ ...value, paragraphs: value.paragraphs.filter((_, k) => k !== i) })
              }
              canUp={i > 0}
              canDown={i < value.paragraphs.length - 1}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange({ ...value, paragraphs: [...value.paragraphs, ''] })}
          className="btn-ghost text-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          Agregar párrafo
        </button>
      </div>
      <Field label="Firma">
        <input
          className="input-admin"
          value={value.signature}
          onChange={(e) => onChange({ ...value, signature: e.target.value })}
        />
      </Field>
      <ImageUploadField
        label="Imagen (opcional)"
        value={value.image}
        onChange={(v) => onChange({ ...value, image: v })}
      />
    </SectionCard>
  );
}

const FEATURE_ICONS = [
  'shield-check',
  'truck',
  'sparkles',
  'wallet',
  'gift',
  'star',
  'heart',
  'award',
];

function FeaturesEditor({
  value,
  onChange,
}: {
  value: SiteContent['features'];
  onChange: (v: SiteContent['features']) => void;
}) {
  return (
    <SectionCard title="Beneficios" description="4 puntos fuertes destacados en la home.">
      <Field label="Título de la sección">
        <input
          className="input-admin"
          value={value.title}
          onChange={(e) => onChange({ ...value, title: e.target.value })}
        />
      </Field>
      <div className="space-y-3">
        {value.items.map((item, i) => (
          <div key={i} className="rounded border border-sand-200 p-4 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <p className="text-xs uppercase tracking-widest text-espresso-lighter">
                Beneficio {i + 1}
              </p>
              <MoveButtons
                onUp={() => onChange({ ...value, items: move(value.items, i, -1) })}
                onDown={() => onChange({ ...value, items: move(value.items, i, 1) })}
                onRemove={() =>
                  onChange({ ...value, items: value.items.filter((_, k) => k !== i) })
                }
                canUp={i > 0}
                canDown={i < value.items.length - 1}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              <Field label="Icono">
                <select
                  className="input-admin"
                  value={item.icon}
                  onChange={(e) => {
                    const next = [...value.items];
                    next[i] = { ...item, icon: e.target.value };
                    onChange({ ...value, items: next });
                  }}
                >
                  {FEATURE_ICONS.map((ic) => (
                    <option key={ic} value={ic}>
                      {ic}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Título">
                <input
                  className="input-admin"
                  value={item.title}
                  onChange={(e) => {
                    const next = [...value.items];
                    next[i] = { ...item, title: e.target.value };
                    onChange({ ...value, items: next });
                  }}
                />
              </Field>
            </div>
            <Field label="Descripción">
              <textarea
                className="input-admin min-h-[70px] resize-y"
                value={item.description}
                onChange={(e) => {
                  const next = [...value.items];
                  next[i] = { ...item, description: e.target.value };
                  onChange({ ...value, items: next });
                }}
              />
            </Field>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            onChange({
              ...value,
              items: [...value.items, { icon: 'sparkles', title: '', description: '' }],
            })
          }
          className="btn-ghost text-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          Agregar beneficio
        </button>
      </div>
    </SectionCard>
  );
}

function CategoriesEditor({
  value,
  onChange,
}: {
  value: SiteContent['categories'];
  onChange: (v: SiteContent['categories']) => void;
}) {
  return (
    <SectionCard title="Categorías" description="Bloques de categorías en la home.">
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Título">
          <input
            className="input-admin"
            value={value.title}
            onChange={(e) => onChange({ ...value, title: e.target.value })}
          />
        </Field>
        <Field label="Subtítulo">
          <input
            className="input-admin"
            value={value.subtitle}
            onChange={(e) => onChange({ ...value, subtitle: e.target.value })}
          />
        </Field>
      </div>
      <div className="space-y-3">
        {value.items.map((item, i) => (
          <div key={i} className="rounded border border-sand-200 p-4 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <p className="text-xs uppercase tracking-widest text-espresso-lighter">
                Categoría {i + 1}
              </p>
              <MoveButtons
                onUp={() => onChange({ ...value, items: move(value.items, i, -1) })}
                onDown={() => onChange({ ...value, items: move(value.items, i, 1) })}
                onRemove={() =>
                  onChange({ ...value, items: value.items.filter((_, k) => k !== i) })
                }
                canUp={i > 0}
                canDown={i < value.items.length - 1}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              <Field label="Etiqueta">
                <input
                  className="input-admin"
                  value={item.label}
                  onChange={(e) => {
                    const next = [...value.items];
                    next[i] = { ...item, label: e.target.value };
                    onChange({ ...value, items: next });
                  }}
                />
              </Field>
              <Field label="Enlace">
                <input
                  className="input-admin"
                  value={item.href}
                  onChange={(e) => {
                    const next = [...value.items];
                    next[i] = { ...item, href: e.target.value };
                    onChange({ ...value, items: next });
                  }}
                />
              </Field>
            </div>
            <Field label="Descripción">
              <input
                className="input-admin"
                value={item.description}
                onChange={(e) => {
                  const next = [...value.items];
                  next[i] = { ...item, description: e.target.value };
                  onChange({ ...value, items: next });
                }}
              />
            </Field>
            <ImageUploadField
              label="Imagen (opcional)"
              value={item.image}
              onChange={(v) => {
                const next = [...value.items];
                next[i] = { ...item, image: v };
                onChange({ ...value, items: next });
              }}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            onChange({
              ...value,
              items: [...value.items, { label: '', href: '/tienda', description: '' }],
            })
          }
          className="btn-ghost text-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          Agregar categoría
        </button>
      </div>
    </SectionCard>
  );
}

function CTAEditor({
  value,
  onChange,
}: {
  value: SiteContent['cta'];
  onChange: (v: SiteContent['cta']) => void;
}) {
  return (
    <SectionCard title="Call to action" description="Banner de llamada a la acción al pie de la home.">
      <Field label="Título">
        <input
          className="input-admin"
          value={value.title}
          onChange={(e) => onChange({ ...value, title: e.target.value })}
        />
      </Field>
      <Field label="Subtítulo">
        <textarea
          className="input-admin min-h-[70px] resize-y"
          value={value.subtitle}
          onChange={(e) => onChange({ ...value, subtitle: e.target.value })}
        />
      </Field>
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Texto del botón">
          <input
            className="input-admin"
            value={value.ctaLabel}
            onChange={(e) => onChange({ ...value, ctaLabel: e.target.value })}
          />
        </Field>
        <Field label="Enlace">
          <input
            className="input-admin"
            value={value.ctaHref}
            onChange={(e) => onChange({ ...value, ctaHref: e.target.value })}
          />
        </Field>
      </div>
    </SectionCard>
  );
}

function AboutEditor({
  value,
  onChange,
}: {
  value: SiteContent['about'];
  onChange: (v: SiteContent['about']) => void;
}) {
  return (
    <SectionCard title="Nosotros" description="Contenido de la página /nosotros.">
      <Field label="Título">
        <input
          className="input-admin"
          value={value.title}
          onChange={(e) => onChange({ ...value, title: e.target.value })}
        />
      </Field>
      <Field label="Subtítulo">
        <textarea
          className="input-admin min-h-[70px] resize-y"
          value={value.subtitle}
          onChange={(e) => onChange({ ...value, subtitle: e.target.value })}
        />
      </Field>
      <div className="space-y-3">
        <span className="label-duna">Secciones</span>
        {value.sections.map((s, i) => (
          <div key={i} className="rounded border border-sand-200 p-4 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <p className="text-xs uppercase tracking-widest text-espresso-lighter">
                Sección {i + 1}
              </p>
              <MoveButtons
                onUp={() => onChange({ ...value, sections: move(value.sections, i, -1) })}
                onDown={() => onChange({ ...value, sections: move(value.sections, i, 1) })}
                onRemove={() =>
                  onChange({ ...value, sections: value.sections.filter((_, k) => k !== i) })
                }
                canUp={i > 0}
                canDown={i < value.sections.length - 1}
              />
            </div>
            <Field label="Título">
              <input
                className="input-admin"
                value={s.title}
                onChange={(e) => {
                  const next = [...value.sections];
                  next[i] = { ...s, title: e.target.value };
                  onChange({ ...value, sections: next });
                }}
              />
            </Field>
            <Field label="Cuerpo">
              <textarea
                className="input-admin min-h-[110px] resize-y"
                value={s.body}
                onChange={(e) => {
                  const next = [...value.sections];
                  next[i] = { ...s, body: e.target.value };
                  onChange({ ...value, sections: next });
                }}
              />
            </Field>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            onChange({ ...value, sections: [...value.sections, { title: '', body: '' }] })
          }
          className="btn-ghost text-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          Agregar sección
        </button>
      </div>
      <Field label="Frase de misión (opcional)">
        <textarea
          className="input-admin min-h-[70px] resize-y"
          value={value.mission || ''}
          onChange={(e) => onChange({ ...value, mission: e.target.value })}
        />
      </Field>
    </SectionCard>
  );
}

function ContactEditor({
  value,
  onChange,
}: {
  value: SiteContent['contact'];
  onChange: (v: SiteContent['contact']) => void;
}) {
  return (
    <SectionCard title="Contacto" description="Información de contacto mostrada en la página /contacto.">
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Título">
          <input
            className="input-admin"
            value={value.title}
            onChange={(e) => onChange({ ...value, title: e.target.value })}
          />
        </Field>
        <Field label="Subtítulo">
          <input
            className="input-admin"
            value={value.subtitle}
            onChange={(e) => onChange({ ...value, subtitle: e.target.value })}
          />
        </Field>
        <Field label="WhatsApp (para mostrar)">
          <input
            className="input-admin"
            value={value.whatsapp}
            onChange={(e) => onChange({ ...value, whatsapp: e.target.value })}
          />
        </Field>
        <Field label="Email">
          <input
            className="input-admin"
            value={value.email}
            onChange={(e) => onChange({ ...value, email: e.target.value })}
          />
        </Field>
        <Field label="Instagram">
          <input
            className="input-admin"
            value={value.instagram}
            onChange={(e) => onChange({ ...value, instagram: e.target.value })}
          />
        </Field>
        <Field label="Ubicación">
          <input
            className="input-admin"
            value={value.location}
            onChange={(e) => onChange({ ...value, location: e.target.value })}
          />
        </Field>
      </div>
      <Field label="Horarios">
        <input
          className="input-admin"
          value={value.hours}
          onChange={(e) => onChange({ ...value, hours: e.target.value })}
        />
      </Field>
    </SectionCard>
  );
}

function ShippingEditor({
  value,
  onChange,
}: {
  value: SiteContent['shipping'];
  onChange: (v: SiteContent['shipping']) => void;
}) {
  return (
    <SectionCard title="Envíos" description="Contenido de la página /envios.">
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Título">
          <input
            className="input-admin"
            value={value.title}
            onChange={(e) => onChange({ ...value, title: e.target.value })}
          />
        </Field>
        <Field label="Subtítulo">
          <input
            className="input-admin"
            value={value.subtitle}
            onChange={(e) => onChange({ ...value, subtitle: e.target.value })}
          />
        </Field>
      </div>
      <div className="space-y-3">
        <span className="label-duna">Secciones</span>
        {value.sections.map((s, i) => (
          <div key={i} className="rounded border border-sand-200 p-4 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <p className="text-xs uppercase tracking-widest text-espresso-lighter">
                Sección {i + 1}
              </p>
              <MoveButtons
                onUp={() => onChange({ ...value, sections: move(value.sections, i, -1) })}
                onDown={() => onChange({ ...value, sections: move(value.sections, i, 1) })}
                onRemove={() =>
                  onChange({ ...value, sections: value.sections.filter((_, k) => k !== i) })
                }
                canUp={i > 0}
                canDown={i < value.sections.length - 1}
              />
            </div>
            <Field label="Título">
              <input
                className="input-admin"
                value={s.title}
                onChange={(e) => {
                  const next = [...value.sections];
                  next[i] = { ...s, title: e.target.value };
                  onChange({ ...value, sections: next });
                }}
              />
            </Field>
            <Field label="Cuerpo">
              <textarea
                className="input-admin min-h-[90px] resize-y"
                value={s.body}
                onChange={(e) => {
                  const next = [...value.sections];
                  next[i] = { ...s, body: e.target.value };
                  onChange({ ...value, sections: next });
                }}
              />
            </Field>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            onChange({ ...value, sections: [...value.sections, { title: '', body: '' }] })
          }
          className="btn-ghost text-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          Agregar sección
        </button>
      </div>
    </SectionCard>
  );
}

function FaqEditor({
  value,
  onChange,
}: {
  value: SiteContent['faq'];
  onChange: (v: SiteContent['faq']) => void;
}) {
  return (
    <SectionCard title="Preguntas frecuentes" description="Contenido de la página /preguntas.">
      <div className="space-y-3">
        {value.map((f, i) => (
          <div key={i} className="rounded border border-sand-200 p-4 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <p className="text-xs uppercase tracking-widest text-espresso-lighter">
                Pregunta {i + 1}
              </p>
              <MoveButtons
                onUp={() => onChange(move(value, i, -1))}
                onDown={() => onChange(move(value, i, 1))}
                onRemove={() => onChange(value.filter((_, k) => k !== i))}
                canUp={i > 0}
                canDown={i < value.length - 1}
              />
            </div>
            <Field label="Pregunta">
              <input
                className="input-admin"
                value={f.q}
                onChange={(e) => {
                  const next = [...value];
                  next[i] = { ...f, q: e.target.value };
                  onChange(next);
                }}
              />
            </Field>
            <Field label="Respuesta">
              <textarea
                className="input-admin min-h-[90px] resize-y"
                value={f.a}
                onChange={(e) => {
                  const next = [...value];
                  next[i] = { ...f, a: e.target.value };
                  onChange(next);
                }}
              />
            </Field>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...value, { q: '', a: '' }])}
          className="btn-ghost text-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          Agregar pregunta
        </button>
      </div>
    </SectionCard>
  );
}
