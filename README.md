# DUNA Perfumes — Ecommerce

Sitio ecommerce completo para **DUNA Perfumes** (Luz & Rodri · Córdoba, Argentina).
Perfumes árabes originales y alternativas de alta persistencia. Diseño editorial en paleta sand/gold/espresso, experiencia de compra integrada con WhatsApp y panel admin completo para gestionar catálogo, pedidos, contenido e imagen de marca.

---

## Stack

- **Next.js 14** (App Router · Server Components · RSC caching)
- **TypeScript** strict
- **Tailwind CSS 3.4** con tokens personalizados (sand/gold/espresso/cream)
- **Zustand** + persist para el carrito (localStorage)
- **JSON filesystem DB** con write-lock en memoria (`data/*.json`)
- **JWT sessions** (`jose` · HS256 · cookie httpOnly)
- **Lucide React** para íconos · **Cormorant Garamond + Inter** via `next/font`

---

## Quickstart

```bash
# 1. Instalar dependencias
npm install

# 2. Copiar variables de entorno y editarlas
cp .env.local.example .env.local   # si existe; si no, usar el .env.local ya creado

# 3. Desarrollo
npm run dev
# → http://localhost:3000
# → http://localhost:3000/admin/login (panel)

# 4. Producción
npm run build && npm run start
```

### Primera ejecución

El primer request a `/api/products` (o a `/tienda`) **auto-siembra el catálogo** desde `data/products-seed.ts` hacia `data/products.json`. El contenido editable (`data/content.json`) y los ajustes (`data/settings.json`) se crean con los defaults al primer PUT desde el panel.

---

## Credenciales de admin

Las credenciales por defecto están en `.env.local`:

```
ADMIN_USERNAME=duna
ADMIN_PASSWORD=duna2026
AUTH_SECRET=<cambiar-por-32+-caracteres-aleatorios>
```

**Antes de salir a producción**:
1. Cambiar `ADMIN_PASSWORD` por una contraseña fuerte.
2. Regenerar `AUTH_SECRET` con `openssl rand -base64 48` (o similar).
3. Setear `NEXT_PUBLIC_SITE_URL=https://tu-dominio.com` para que `sitemap.xml` y `robots.txt` apunten al dominio correcto.

---

## Estructura

```
app/
├─ (rutas públicas)
│  ├─ page.tsx                  # Home con hero, featured, story, features, categorías, CTA
│  ├─ tienda/
│  │  ├─ page.tsx               # Catálogo completo
│  │  ├─ originales/page.tsx    # Filtrado a ORIGINAL
│  │  └─ alternativas/page.tsx  # Filtrado a ALTERNATIVA
│  ├─ producto/[slug]/page.tsx  # Ficha de producto (SSG con generateStaticParams)
│  ├─ carrito/page.tsx
│  ├─ checkout/page.tsx
│  ├─ checkout/gracias/page.tsx # Confirmación + deep-link WhatsApp
│  ├─ nosotros/page.tsx
│  ├─ contacto/page.tsx
│  ├─ envios/page.tsx
│  └─ preguntas/page.tsx
├─ admin/
│  ├─ login/page.tsx            # Login público
│  └─ (panel)/                  # Route group protegido con requireAuth()
│     ├─ layout.tsx             # Sidebar + header + guard
│     ├─ page.tsx               # Dashboard (KPIs, pedidos recientes, top productos)
│     ├─ productos/             # CRUD + uploads
│     ├─ pedidos/               # Lista + detalle con cambio de estado
│     ├─ contenido/             # Editor de textos e imágenes
│     └─ ajustes/               # Datos comerciales, contacto, SEO
├─ api/
│  ├─ auth/{login,logout}/route.ts
│  ├─ products/{route.ts, [id]/route.ts}
│  ├─ orders/{route.ts, [id]/route.ts}
│  ├─ content/route.ts
│  ├─ settings/route.ts
│  └─ upload/route.ts           # Multer-free; escribe a public/uploads/
├─ sitemap.ts                   # Dinámico con productos activos
├─ robots.ts
└─ layout.tsx                   # Root: metadata dinámica, fuentes, Footer, WhatsAppFloat

components/
├─ layout/                      # Header, Footer, AnnouncementBar, WhatsAppFloat
├─ home/                        # Hero, FeaturedProducts, Story, Features, Categories, CTA, BrandsStrip, TestimonialStrip
├─ products/                    # ProductCard, ProductGallery, ShopFilters, AddToCart
├─ admin/                       # AdminSidebar, AdminHeader, ProductForm, StatusBadge
└─ ui/                          # Logo, Toast (context), primitives

lib/
├─ db.ts                        # Lecturas/escrituras atómicas a data/*.json
├─ auth.ts                      # JWT sign/verify + requireAuth()
├─ cart.ts                      # Store Zustand (persist: 'duna-cart')
├─ filters.ts                   # filterAndSort + extractFilterOptions
├─ whatsapp.ts                  # URLs y plantillas de mensaje
└─ utils.ts                     # formatPrice, formatDateTime, slugify, cn, generateId

data/
├─ products-seed.ts             # Catálogo semilla parseado de los PDFs de DUNA
├─ content-default.ts           # Defaults de SiteContent
├─ settings-default.ts          # Defaults de SiteSettings
├─ products.json                # (generado al primer run)
├─ orders.json                  # (se va llenando con los pedidos)
├─ content.json                 # (generado al primer PUT desde /admin/contenido)
└─ settings.json                # (generado al primer PUT desde /admin/ajustes)

types/index.ts                  # Product, Order, SiteContent, SiteSettings, etc.

public/
├─ favicon.svg
└─ uploads/                     # Imágenes subidas desde el admin
```

---

## Flujo de compra

1. Cliente explora **tienda** → filtra por marca/género/clasificación/familia/precio.
2. Abre ficha de producto → **AddToCart** con selector de cantidad y precio efectivo/transferencia calculado.
3. Carrito persiste en `localStorage` (Zustand).
4. Checkout en 3 pasos (datos · envío · pago). Métodos: transferencia, efectivo (ambos con 10% OFF), Mercado Pago.
5. `POST /api/orders` → valida stock, crea orden con `cashPrice` cuando corresponde, decrementa stock.
6. Redirige a `/checkout/gracias?code=...&id=...` con **CTA de WhatsApp prellenado** (`buildOrderConfirmationMessage`).

---

## Panel admin

`/admin/login` → `/admin` (dashboard).

| Sección | Qué gestiona |
| --- | --- |
| **Dashboard** | KPIs 30 días (ingresos, pedidos, pendientes, stock), pedidos recientes, top productos, alertas de stock |
| **Productos** | CRUD completo, filtros (activos, destacados, bajo stock…), toggle featured/active inline, uploads |
| **Pedidos** | Lista con búsqueda y filtro por estado; detalle con cambio de estado, notas internas, WhatsApp deep-link, copiar link al cliente, eliminar |
| **Contenido** | 10 bloques editables: banner, hero, historia, beneficios, categorías, CTA, nosotros, contacto, envíos, FAQ. Orden drag por flechas. Uploads de imágenes integrados |
| **Ajustes** | Marca, contacto (WhatsApp/IG/email/ubicación), reglas comerciales (descuento efectivo, mínimo envío gratis), SEO (metaTitle, metaDescription, og:image) |

Los cambios en contenido/ajustes se reflejan inmediatamente — la home y el layout raíz leen vía `getContent()` / `getSettings()` en cada request (Next revalidará según el caching configurado).

---

## Seguridad

- Cookies de sesión `httpOnly`, `sameSite=lax`, `secure` en producción, expiración 7 días.
- Todos los endpoints de mutación (`POST`/`PATCH`/`PUT`/`DELETE`) validan `isAuthenticated()`.
- Uploads: validación de MIME type (JPEG/PNG/WEBP/GIF/AVIF) y tamaño máximo 8 MB.
- Rutas admin detrás de un route group `(panel)` con `await requireAuth()` en el layout.

---

## Variables de entorno

```
ADMIN_USERNAME=duna
ADMIN_PASSWORD=duna2026
AUTH_SECRET=<32+ caracteres>
NEXT_PUBLIC_WHATSAPP=5493513000000      # sólo dígitos
NEXT_PUBLIC_INSTAGRAM=duna.oud
NEXT_PUBLIC_SITE_URL=https://...        # opcional, para sitemap/robots
```

---

## Migraciones futuras

El módulo `lib/db.ts` encapsula todo acceso a datos. Migrar a SQLite o Postgres requiere sólo reemplazar la implementación manteniendo la misma interfaz pública (`getProducts`, `upsertProduct`, `createOrder`, etc.).

Para escalar subidas de imágenes a S3/Cloudinary, reemplazar `app/api/upload/route.ts` por uno que retorne la URL externa — el resto del sistema no requiere cambios.

---

## Licencia

Uso interno de DUNA Perfumes · Luz & Rodri · Córdoba.
