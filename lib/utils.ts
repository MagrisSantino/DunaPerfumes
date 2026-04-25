import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(value: number, locale = 'es-AR', currency = 'ARS') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

export function truncate(text: string, max = 80) {
  if (text.length <= max) return text;
  return text.slice(0, max).trimEnd() + '…';
}

export function formatDate(iso: string, locale = 'es-AR') {
  return new Date(iso).toLocaleDateString(locale, {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

export function formatDateTime(iso: string, locale = 'es-AR') {
  return new Date(iso).toLocaleString(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function generateId(prefix = '') {
  const rnd = Math.random().toString(36).slice(2, 10);
  const t = Date.now().toString(36);
  return `${prefix}${t}${rnd}`;
}

export function generateOrderCode() {
  const d = new Date();
  const y = d.getFullYear().toString().slice(-2);
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const rnd = Math.floor(Math.random() * 9000 + 1000);
  return `DN-${y}${m}${day}-${rnd}`;
}

export function parseNotes(notes: string) {
  // Split an unstructured fragrance notes string into family + top-notes
  if (!notes) return { family: '', top: '' };
  const [family, ...rest] = notes.split(/,(.+)/);
  return {
    family: (family || '').trim(),
    top: (rest.join(',') || '').replace(/^\s*salida[^:]*:\s*/i, '').trim(),
  };
}
