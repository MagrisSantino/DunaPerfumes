import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  CheckCircle2,
  Truck,
  ShieldCheck,
  Wallet,
  RefreshCw,
  Instagram,
  ChevronRight,
} from 'lucide-react';
import { getProductBySlug, getProducts, getSettings } from '@/lib/db';
import { formatPrice, parseNotes } from '@/lib/utils';
import { ProductGallery } from '@/components/products/ProductGallery';
import { AddToCart } from '@/components/products/AddToCart';
import { ProductCard } from '@/components/products/ProductCard';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) return { title: 'Producto' };
  return {
    title: `${product.brand} — ${product.model}`,
    description: `${product.fragranceType} · ${product.notes || product.family || ''} — DUNA Perfumes`,
  };
}

export async function generateStaticParams() {
  // Pre-generate all active products for faster navigation
  const products = await getProducts();
  return products.filter((p) => p.active).map((p) => ({ slug: p.slug }));
}

export const revalidate = 60;

export default async function ProductPage({ params }: Props) {
  const [product, products, settings] = await Promise.all([
    getProductBySlug(params.slug),
    getProducts(),
    getSettings(),
  ]);
  if (!product || !product.active) notFound();

  const related = products
    .filter(
      (p) =>
        p.id !== product.id &&
        p.active &&
        (p.brand === product.brand || p.classification === product.classification),
    )
    .slice(0, 4);

  const { family, top } = parseNotes(product.notes);
  const savings = product.price - product.cashPrice;

  return (
    <article className="pb-20">
      {/* Breadcrumb */}
      <nav className="container-duna pt-6 pb-4">
        <ol className="flex items-center gap-2 text-xs text-espresso-lighter">
          <li><Link href="/" className="hover:text-gold">Inicio</Link></li>
          <li><ChevronRight className="w-3 h-3" /></li>
          <li>
            <Link
              href={product.classification === 'ORIGINAL' ? '/tienda/originales' : '/tienda/alternativas'}
              className="hover:text-gold"
            >
              {product.classification === 'ORIGINAL' ? 'Originales' : 'Alternativas'}
            </Link>
          </li>
          <li><ChevronRight className="w-3 h-3" /></li>
          <li className="truncate text-espresso">{product.brand} · {product.model}</li>
        </ol>
      </nav>

      <div className="container-duna">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          <ProductGallery images={product.images} brand={product.brand} model={product.model} />

          <div className="lg:pt-4 space-y-6">
            <div>
              <p className="text-[10px] tracking-widest3 uppercase text-gold mb-2">
                {product.brand} · {product.gender}
              </p>
              <h1 className="font-display text-4xl md:text-5xl leading-tight text-espresso text-balance">
                {product.model}
              </h1>
              <p className="text-sm text-espresso-lighter mt-3">
                {product.fragranceType} · {product.size}
              </p>
              <div className="flex items-center gap-2 mt-4">
                {product.classification === 'ORIGINAL' && (
                  <span className="inline-flex items-center gap-1 text-[10px] tracking-widest3 uppercase bg-espresso text-cream px-2 py-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Original con sello
                  </span>
                )}
                {product.stock > 0 && product.stock <= 3 && (
                  <span className="text-[10px] tracking-widest3 uppercase bg-gold/15 text-gold-darker px-2 py-1">
                    Últimas {product.stock}
                  </span>
                )}
                {product.stock <= 0 && (
                  <span className="text-[10px] tracking-widest3 uppercase bg-red-800 text-cream px-2 py-1">
                    Sin stock
                  </span>
                )}
              </div>
            </div>

            <hr className="hairline" />

            {/* Price block */}
            <div className="space-y-2">
              <p className="font-display text-4xl text-espresso tabular-nums">
                {formatPrice(product.price)}
              </p>
              {savings > 0 && (
                <p className="text-gold tabular-nums">
                  <span className="font-medium">{formatPrice(product.cashPrice)}</span>
                  <span className="text-sm text-espresso-lighter"> — pagando en efectivo/transferencia · ahorrás {formatPrice(savings)}</span>
                </p>
              )}
              <p className="text-xs text-espresso-lighter">3 cuotas sin interés con MercadoPago</p>
            </div>

            <AddToCart product={product} whatsappPhone={settings.whatsappRaw} />

            {/* Notes */}
            {product.notes && (
              <div className="pt-6 border-t border-sand-200 space-y-3">
                <h3 className="text-[11px] tracking-widest3 uppercase text-espresso-lighter">Notas olfativas</h3>
                {family && (
                  <div>
                    <span className="text-[10px] tracking-widest3 uppercase text-gold">Familia</span>
                    <p className="text-espresso">{family}</p>
                  </div>
                )}
                {top && (
                  <div>
                    <span className="text-[10px] tracking-widest3 uppercase text-gold">Notas</span>
                    <p className="text-espresso leading-relaxed">{top}</p>
                  </div>
                )}
                {!family && !top && (
                  <p className="text-espresso leading-relaxed text-pretty">{product.notes}</p>
                )}
              </div>
            )}

            {/* Trust strip */}
            <ul className="grid grid-cols-2 gap-3 pt-4 text-xs">
              <TrustItem icon={ShieldCheck} label="Autenticidad garantizada" />
              <TrustItem icon={Truck} label="Envío gratis en Córdoba" />
              <TrustItem icon={Wallet} label="10% OFF en efectivo" />
              <TrustItem icon={RefreshCw} label="Asesoramiento personal" />
            </ul>

            {/* Share */}
            <div className="pt-4 flex items-center gap-4 text-xs text-espresso-lighter">
              <span className="tracking-widest uppercase">Compartir:</span>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`Mirá este perfume en DUNA: ${product.brand} ${product.model}`)}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-gold"
              >
                WhatsApp
              </a>
              <a
                href={`https://www.instagram.com/${settings.instagramHandle}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-gold inline-flex items-center gap-1"
              >
                <Instagram className="w-3.5 h-3.5" /> Instagram
              </a>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-24">
            <div className="flex items-end justify-between mb-8">
              <h2 className="font-display text-3xl md:text-4xl text-espresso">
                También te puede <span className="italic text-gold">gustar</span>
              </h2>
              <Link href="/tienda" className="btn-ghost">Ver todo →</Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}

function TrustItem({ icon: Icon, label }: { icon: typeof Truck; label: string }) {
  return (
    <li className="flex items-center gap-2 text-espresso">
      <Icon className="w-4 h-4 text-gold shrink-0" />
      <span>{label}</span>
    </li>
  );
}
