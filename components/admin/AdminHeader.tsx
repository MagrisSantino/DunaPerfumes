'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { LogOut, Menu, X, LayoutDashboard, Package, ShoppingCart, FileText, Settings, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/productos', label: 'Productos', icon: Package },
  { href: '/admin/pedidos', label: 'Pedidos', icon: ShoppingCart },
  { href: '/admin/contenido', label: 'Contenido', icon: FileText },
  { href: '/admin/ajustes', label: 'Ajustes', icon: Settings },
];

const titleFor = (path: string) => {
  const item = NAV.find((n) => (n.exact ? path === n.href : path.startsWith(n.href)));
  return item?.label ?? 'Panel';
};

export function AdminHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.replace('/admin/login');
    router.refresh();
  };

  return (
    <>
      <header className="bg-white border-b border-sand-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button onClick={() => setMenuOpen(true)} className="lg:hidden p-2 -ml-2" aria-label="Abrir menú">
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="font-display text-2xl text-espresso">{titleFor(pathname)}</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" target="_blank" className="hidden sm:inline-flex items-center gap-1.5 text-xs text-espresso-lighter hover:text-gold">
              <ExternalLink className="w-3.5 h-3.5" />
              Ver tienda
            </Link>
            <button
              onClick={logout}
              className="inline-flex items-center gap-2 text-xs text-espresso-lighter hover:text-red-700"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Salir</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMenuOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-72 bg-espresso text-cream flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-sand-800">
              <h2 className="font-display text-xl">Menú</h2>
              <button onClick={() => setMenuOpen(false)} aria-label="Cerrar">
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex-1 p-4 space-y-1">
              {NAV.map((item) => {
                const Icon = item.icon;
                const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded text-sm transition-colors',
                      active
                        ? 'bg-gold text-espresso font-medium'
                        : 'text-sand-400 hover:bg-espresso-dark hover:text-cream',
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}
