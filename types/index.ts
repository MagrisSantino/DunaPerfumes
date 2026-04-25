// ────────────────────────────────────────────────────────────
// DUNA Perfumes — shared TypeScript types
// ────────────────────────────────────────────────────────────

export type Gender = 'UNISEX' | 'MASCULINO' | 'FEMENINO';
export type Classification = 'ORIGINAL' | 'ALTERNATIVA';

export interface Product {
  id: string;
  slug: string;
  brand: string;
  classification: Classification;
  model: string;
  gender: Gender;
  size: string;
  fragranceType: string;
  price: number;
  cashPrice: number;
  notes: string;
  family?: string;
  topNotes?: string;
  stock: number;
  featured: boolean;
  active: boolean;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  productId: string;
  slug: string;
  brand: string;
  model: string;
  size: string;
  price: number;
  cashPrice: number;
  image: string;
  quantity: number;
}

export type OrderStatus =
  | 'pendiente'
  | 'confirmado'
  | 'pagado'
  | 'enviado'
  | 'entregado'
  | 'cancelado';

export type PaymentMethod = 'transferencia' | 'efectivo' | 'mercadopago';

export interface OrderItem {
  productId: string;
  brand: string;
  model: string;
  size: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface Order {
  id: string;
  code: string;
  customer: {
    name: string;
    phone: string;
    email?: string;
    dni?: string;
  };
  shipping: {
    method: 'envio' | 'retiro';
    address?: string;
    city?: string;
    zone?: string;
    notes?: string;
  };
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shippingCost: number;
  total: number;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// ── Site content (fully editable from admin) ──
export interface SiteContent {
  announcement: {
    enabled: boolean;
    items: string[];
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    ctaPrimary: { label: string; href: string };
    ctaSecondary: { label: string; href: string };
    backgroundImage?: string;
  };
  story: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    signature: string;
    image?: string;
  };
  features: {
    title: string;
    items: Array<{ icon: string; title: string; description: string }>;
  };
  categories: {
    title: string;
    subtitle: string;
    items: Array<{ label: string; href: string; image?: string; description: string }>;
  };
  cta: {
    title: string;
    subtitle: string;
    ctaLabel: string;
    ctaHref: string;
  };
  about: {
    title: string;
    subtitle: string;
    sections: Array<{ title: string; body: string }>;
    mission?: string;
  };
  contact: {
    title: string;
    subtitle: string;
    email: string;
    whatsapp: string;
    instagram: string;
    location: string;
    hours: string;
  };
  shipping: {
    title: string;
    subtitle: string;
    sections: Array<{ title: string; body: string }>;
  };
  faq: Array<{ q: string; a: string }>;
}

export interface SiteSettings {
  brandName: string;
  tagline: string;
  whatsappNumber: string;       // "+54 9 351..."
  whatsappRaw: string;          // "549351..."
  instagramHandle: string;
  email: string;
  location: string;
  freeShippingMinimum: number;
  cashDiscountPercent: number;
  currency: string;
  locale: string;
  metaTitle: string;
  metaDescription: string;
  ogImage?: string;
}
