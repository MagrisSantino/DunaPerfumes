'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  FileText,
  Settings,
  ExternalLink,
} from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { cn } from '@/lib/utils';

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/productos', label: 'Productos', icon: Package },
  { href: '/admin/pedidos', label: 'Pedidos', icon: ShoppingCart },
  { href: '/admin/contenido', label: 'Contenido', icon: FileText },
  { href: '/admin/ajustes', label: 'Ajustes', icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex w-60 bg-espresso text-cream flex-col sticky top-0 h-screen">
      <div className="p-6 border-b border-sand-800">
        <Logo variant="light" />
        <p className="text-[9px] tracking-widest3 uppercase text-gold mt-3">Panel privado</p>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {NAV.map((item) => {
          const Icon = item.icon;
          const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
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
      <div className="p-4 border-t border-sand-800">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 text-xs text-sand-400 hover:text-gold"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          Ver tienda pública
        </Link>
      </div>
    </aside>
  );
}
