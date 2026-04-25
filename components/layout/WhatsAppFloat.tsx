'use client';

import { MessageCircle } from 'lucide-react';
import { CartDrawer } from '@/components/cart/CartDrawer';

export function WhatsAppFloat({ phone }: { phone: string }) {
  const text = encodeURIComponent('¡Hola DUNA! Quiero consultar por una fragancia 🌙');
  return (
    <>
      <a
        href={`https://wa.me/${phone}?text=${text}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Chatear por WhatsApp"
        className="fixed bottom-6 left-6 z-40 group"
      >
        <span className="absolute inset-0 rounded-full bg-gold animate-ping opacity-20" />
        <span className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gold text-cream shadow-gold hover:bg-gold-dark transition-colors">
          <MessageCircle className="w-6 h-6" />
        </span>
      </a>
      <CartDrawer />
    </>
  );
}
