'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Search, ShoppingBag, User, X } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { cn } from '@/lib/utils';
import { useCart } from '@/store/cart-store';

const NAV = [
  { label: 'Tienda', href: '/tienda' },
  { label: 'Originales', href: '/tienda/originales' },
  { label: 'Alternativas', href: '/tienda/alternativas' },
  { label: 'Nosotros', href: '/nosotros' },
  { label: 'Envíos', href: '/envios' },
  { label: 'Contacto', href: '/contacto' },
];

export function Header({ brandName }: { brandName: string }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const totalItems = useCart((s) => s.totalItems());
  const openCart = useCart((s) => s.open);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 transition-all duration-300 border-b',
        scrolled
          ? 'bg-cream/95 backdrop-blur-md border-sand-300 shadow-soft'
          : 'bg-cream border-transparent',
      )}
    >
      <div className="container-duna flex items-center justify-between h-20 md:h-24">
        {/* Mobile burger */}
        <button
          onClick={() => setMenuOpen(true)}
          className="lg:hidden p-2 -ml-2 text-espresso hover:text-gold"
          aria-label="Abrir menú"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Logo */}
        <Link href="/" className="mx-auto lg:mx-0 lg:mr-10" aria-label={brandName}>
          <Logo />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8 flex-1">
          {NAV.map((item) => {
            const active = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'relative text-[13px] tracking-widest uppercase font-medium transition-colors',
                  active ? 'text-gold' : 'text-espresso hover:text-gold',
                )}
              >
                {item.label}
                {active && <span className="absolute -bottom-1 left-0 right-0 h-px bg-gold" />}
              </Link>
            );
          })}
        </nav>

        {/* Right icons */}
        <div className="flex items-center gap-1 md:gap-3">
          <button
            onClick={() => setSearchOpen((s) => !s)}
            className="p-2 text-espresso hover:text-gold"
            aria-label="Buscar"
          >
            <Search className="w-5 h-5" />
          </button>
          <Link href="/admin" className="hidden md:flex p-2 text-espresso hover:text-gold" aria-label="Admin">
            <User className="w-5 h-5" />
          </Link>
          <button
            onClick={openCart}
            className="relative p-2 text-espresso hover:text-gold"
            aria-label="Abrir carrito"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-gold text-cream text-[10px] font-medium min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Search drawer */}
      {searchOpen && <SearchDrawer onClose={() => setSearchOpen(false)} />}

      {/* Mobile menu */}
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}

function SearchDrawer({ onClose }: { onClose: () => void }) {
  const [q, setQ] = useState('');
  return (
    <div className="absolute inset-x-0 top-full bg-cream border-b border-sand-300 shadow-elegant animate-fade-in">
      <div className="container-duna py-6">
        <form
          action="/tienda"
          method="get"
          onSubmit={onClose}
          className="flex items-center gap-4 border-b border-sand-400 pb-2"
        >
          <Search className="w-5 h-5 text-espresso-lighter" />
          <input
            name="q"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            autoFocus
            placeholder="Buscar fragancia, marca o nota..."
            className="flex-1 bg-transparent text-lg font-display placeholder:text-sand-500 focus:outline-none"
          />
          <button type="button" onClick={onClose} className="text-espresso-lighter hover:text-gold">
            <X className="w-5 h-5" />
          </button>
        </form>
        <div className="mt-4 flex flex-wrap gap-2 text-xs text-espresso-lighter">
          <span className="uppercase tracking-widest font-medium mr-2">Sugerencias:</span>
          {['Yara', 'Khamrah', 'Club de Nuit', 'Oud', 'Bharara King', 'Amber Oud'].map((s) => (
            <Link
              key={s}
              href={`/tienda?q=${encodeURIComponent(s)}`}
              className="px-3 py-1 border border-sand-300 hover:border-gold hover:text-gold"
            >
              {s}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div
      className={cn(
        'fixed inset-0 z-50 lg:hidden transition-all duration-500',
        open ? 'visible' : 'invisible',
      )}
    >
      <div
        className={cn(
          'absolute inset-0 bg-espresso/40 transition-opacity',
          open ? 'opacity-100' : 'opacity-0',
        )}
        onClick={onClose}
      />
      <aside
        className={cn(
          'absolute left-0 top-0 bottom-0 w-[85vw] max-w-sm bg-cream shadow-elegant transition-transform duration-500 flex flex-col',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex items-center justify-between px-5 h-20 border-b border-sand-200">
          <Logo />
          <button onClick={onClose} aria-label="Cerrar menú">
            <X className="w-5 h-5 text-espresso-lighter" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto p-5 space-y-1">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="block py-3 text-lg font-display text-espresso hover:text-gold border-b border-sand-200"
            >
              {n.label}
            </Link>
          ))}
          <Link
            href="/admin"
            className="block mt-6 py-3 text-xs uppercase tracking-widest text-espresso-lighter border-t border-sand-300"
          >
            Acceso admin
          </Link>
        </nav>
        <div className="p-5 border-t border-sand-200 text-xs text-espresso-lighter space-y-1">
          <p>Córdoba, Argentina</p>
          <p>@duna.oud</p>
        </div>
      </aside>
    </div>
  );
}
