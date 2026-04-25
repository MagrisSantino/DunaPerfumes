import Link from 'next/link';
import { Instagram, Mail, MapPin, MessageCircle } from 'lucide-react';
import type { SiteContent, SiteSettings } from '@/types';
import { Logo } from '@/components/ui/Logo';

export function Footer({ settings, content }: { settings: SiteSettings; content: SiteContent }) {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-espresso text-sand-300 mt-24">
      <div className="container-duna py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-14">
          <div className="lg:col-span-2 space-y-6">
            <Logo variant="light" />
            <p className="text-sm leading-relaxed text-sand-400 max-w-sm">
              {settings.tagline}. Fragancias seleccionadas con criterio — cada una elegida por Luz y Rodri.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={`https://www.instagram.com/${settings.instagramHandle}`}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 flex items-center justify-center border border-sand-700 hover:border-gold hover:text-gold"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${settings.whatsappRaw}`}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 flex items-center justify-center border border-sand-700 hover:border-gold hover:text-gold"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${settings.email}`}
                className="w-10 h-10 flex items-center justify-center border border-sand-700 hover:border-gold hover:text-gold"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          <Column title="Tienda">
            <FooterLink href="/tienda">Todos los perfumes</FooterLink>
            <FooterLink href="/tienda/originales">Originales</FooterLink>
            <FooterLink href="/tienda/alternativas">Alternativas</FooterLink>
            <FooterLink href="/tienda?genero=FEMENINO">Femeninos</FooterLink>
            <FooterLink href="/tienda?genero=MASCULINO">Masculinos</FooterLink>
            <FooterLink href="/tienda?genero=UNISEX">Unisex</FooterLink>
          </Column>

          <Column title="DUNA">
            <FooterLink href="/nosotros">Nuestra historia</FooterLink>
            <FooterLink href="/envios">Envíos y retiros</FooterLink>
            <FooterLink href="/contacto">Contacto</FooterLink>
            <FooterLink href="/preguntas">Preguntas frecuentes</FooterLink>
            <FooterLink href="/admin">Panel admin</FooterLink>
          </Column>

          <Column title="Contacto">
            <li className="flex items-start gap-2 text-sm text-sand-400">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{settings.location}</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-sand-400">
              <MessageCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <a href={`https://wa.me/${settings.whatsappRaw}`} target="_blank" rel="noreferrer" className="hover:text-gold">
                {settings.whatsappNumber}
              </a>
            </li>
            <li className="flex items-start gap-2 text-sm text-sand-400">
              <Instagram className="w-4 h-4 mt-0.5 shrink-0" />
              <a
                href={`https://www.instagram.com/${settings.instagramHandle}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-gold"
              >
                @{settings.instagramHandle}
              </a>
            </li>
            <li className="flex items-start gap-2 text-sm text-sand-400">
              <Mail className="w-4 h-4 mt-0.5 shrink-0" />
              <a href={`mailto:${settings.email}`} className="hover:text-gold">
                {settings.email}
              </a>
            </li>
            <li className="text-xs text-sand-500 pt-2">{content.contact.hours}</li>
          </Column>
        </div>
      </div>
      <div className="border-t border-sand-800">
        <div className="container-duna py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-sand-500">
          <p>© {year} {settings.brandName}. Todos los derechos reservados.</p>
          <p className="tracking-widest uppercase">Hecho con ♡ en Córdoba</p>
        </div>
      </div>
    </footer>
  );
}

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-xs font-sans font-semibold tracking-widest3 uppercase text-cream mb-5">{title}</h4>
      <ul className="space-y-3">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-sm text-sand-400 hover:text-gold">
        {children}
      </Link>
    </li>
  );
}
