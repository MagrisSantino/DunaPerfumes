'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Check, X, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type ToastVariant = 'success' | 'error' | 'info';
type Toast = { id: string; message: string; variant: ToastVariant };

interface ToastContextValue {
  show: (message: string, variant?: ToastVariant) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>');
  return ctx;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Toast[]>([]);

  const show = useCallback((message: string, variant: ToastVariant = 'success') => {
    const id = Math.random().toString(36).slice(2);
    setItems((s) => [...s, { id, message, variant }]);
    setTimeout(() => setItems((s) => s.filter((t) => t.id !== id)), 3600);
  }, []);

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none">
        {items.map((t) => (
          <div
            key={t.id}
            className={cn(
              'pointer-events-auto min-w-[280px] max-w-sm flex items-start gap-3 px-4 py-3 shadow-elegant animate-fade-up border',
              t.variant === 'success' && 'bg-espresso text-cream border-espresso',
              t.variant === 'error' && 'bg-red-900 text-white border-red-900',
              t.variant === 'info' && 'bg-white text-espresso border-sand-300',
            )}
          >
            <span className="mt-0.5">
              {t.variant === 'success' && <Check className="w-4 h-4 text-gold" />}
              {t.variant === 'error' && <AlertCircle className="w-4 h-4" />}
              {t.variant === 'info' && <AlertCircle className="w-4 h-4 text-gold" />}
            </span>
            <p className="text-sm leading-snug flex-1">{t.message}</p>
            <button
              onClick={() => setItems((s) => s.filter((x) => x.id !== t.id))}
              className="opacity-60 hover:opacity-100"
              aria-label="Cerrar notificación"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
