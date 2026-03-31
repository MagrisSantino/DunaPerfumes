"use client"

import { Headset, Package, Wallet, Instagram, ArrowRight } from "lucide-react"
import Link from "next/link"

// ============================================
// NAVBAR COMPONENT
// ============================================
function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#F4EFEA]/80 backdrop-blur-md border-b border-border/40">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-1.5 sm:gap-2">
          <span className="font-serif text-xl font-semibold tracking-wide text-foreground transition-colors group-hover:text-accent sm:text-2xl">
            DUNA
          </span>
          <span className="hidden font-serif text-sm font-light tracking-widest text-muted-foreground xs:inline sm:inline">
            Perfumes
          </span>
        </Link>

        {/* CTA Button */}
        <Link
          href="#catalogo"
          className="group flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg sm:gap-2 sm:px-5 sm:py-2.5 sm:text-sm"
        >
          <span className="hidden sm:inline">Ver Catálogo</span>
          <span className="sm:hidden">Catálogo</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 sm:h-4 sm:w-4" />
        </Link>
      </nav>
    </header>
  )
}

// ============================================
// HERO SECTION
// ============================================
function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F4EFEA] via-[#EDE6DD] to-[#E7E0D8]">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/5 blur-3xl sm:-right-32 sm:-top-32 sm:h-96 sm:w-96" />
        <div className="absolute -left-20 bottom-0 h-52 w-52 rounded-full bg-accent/10 blur-3xl sm:-left-32 sm:h-80 sm:w-80" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center rounded-full border border-accent/30 bg-card/60 px-3 py-1 backdrop-blur-sm sm:mb-8 sm:px-4 sm:py-1.5">
            <span className="text-[10px] font-medium tracking-widest text-accent uppercase sm:text-xs">
              Perfumería Árabe Premium
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-serif text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-balance">
            Dejá huella con{" "}
            <span className="text-accent">cada paso.</span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-4 max-w-xl px-2 text-base leading-relaxed text-muted-foreground sm:mt-6 sm:px-0 sm:text-lg lg:text-xl text-pretty">
            Descubrí la exclusividad y el misterio de la auténtica perfumería árabe.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 px-4 sm:mt-10 sm:flex-row sm:gap-4 sm:px-0">
            <Link
              href="#catalogo"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl sm:w-auto sm:px-8 sm:py-4 sm:text-base"
            >
              Explorar fragancias
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="#asesoramiento"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-primary/20 bg-transparent px-6 py-3.5 text-sm font-medium text-foreground transition-all hover:border-primary/40 hover:bg-card sm:w-auto sm:px-8 sm:py-4 sm:text-base"
            >
              Asesoramiento personalizado
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent sm:h-24" />
    </section>
  )
}

// ============================================
// NUESTRA HISTORIA SECTION
// ============================================
function HistoriaSection() {
  return (
    <section className="bg-background py-16 sm:py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          {/* Small Label */}
          <span className="mb-3 inline-block text-[10px] font-medium tracking-[0.2em] text-accent uppercase sm:mb-4 sm:text-xs">
            Nuestra Esencia
          </span>

          {/* Title */}
          <h2 className="font-serif text-2xl font-semibold leading-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl text-balance">
            Así nació <span className="text-accent">DUNA</span>
          </h2>

          {/* Decorative Line */}
          <div className="mx-auto my-6 h-px w-12 bg-accent/40 sm:my-8 sm:w-16" />

          {/* Story Text */}
          <p className="px-2 text-base leading-relaxed text-muted-foreground sm:px-0 sm:text-lg text-pretty">
            Somos <span className="font-medium text-foreground">Luz y Rodri</span>. 
            Lo que empezó como una curiosidad por los aromas profundos y exóticos, 
            nos impulsó a traer algo distinto a Córdoba.
          </p>
          <p className="mt-4 px-2 text-base leading-relaxed text-muted-foreground sm:mt-6 sm:px-0 sm:text-lg text-pretty">
            Para nosotros, un perfume no es solo una fragancia, es una{" "}
            <span className="font-medium text-accent">marca personal</span>. 
            Importamos lo mejor de la perfumería árabe para que encuentres 
            la esencia que te hace único/a.
          </p>
        </div>
      </div>
    </section>
  )
}

// ============================================
// LÍNEAS DE PRODUCTO SECTION
// ============================================
function ProductLinesSection() {
  return (
    <section id="catalogo" className="bg-[#EDE6DD] py-16 sm:py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 text-center sm:mb-16">
          <span className="mb-3 inline-block text-[10px] font-medium tracking-[0.2em] text-accent uppercase sm:mb-4 sm:text-xs">
            Colecciones
          </span>
          <h2 className="font-serif text-2xl font-semibold leading-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
            Nuestras Líneas
          </h2>
        </div>

        {/* Bento Cards */}
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Card 1 - Originales */}
          <article className="group relative overflow-hidden rounded-2xl bg-card p-6 shadow-sm transition-all hover:shadow-xl sm:rounded-3xl sm:p-8 lg:p-12">
            {/* Background Accent */}
            <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-accent/10 transition-transform group-hover:scale-150 sm:-right-20 sm:-top-20 sm:h-40 sm:w-40" />
            
            <div className="relative">
              {/* Badge */}
              <span className="mb-4 inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-[10px] font-medium tracking-wide text-accent sm:mb-6 sm:px-3 sm:py-1 sm:text-xs">
                Premium
              </span>

              {/* Title */}
              <h3 className="font-serif text-xl font-semibold text-foreground sm:text-2xl md:text-3xl lg:text-4xl">
                Línea Originales
              </h3>

              {/* Description */}
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground sm:mt-4 sm:text-base lg:text-lg">
                Fragancias 100% originales con sello de autenticidad. 
                Las marcas más exclusivas del mercado árabe a tu alcance.
              </p>

              {/* CTA */}
              <Link
                href="#"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent/80 sm:mt-8"
              >
                Descubrir colección
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </article>

          {/* Card 2 - Alternativas */}
          <article className="group relative overflow-hidden rounded-2xl bg-primary p-6 shadow-sm transition-all hover:shadow-xl sm:rounded-3xl sm:p-8 lg:p-12">
            {/* Background Accent */}
            <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-accent/20 transition-transform group-hover:scale-150 sm:-right-20 sm:-top-20 sm:h-40 sm:w-40" />
            
            <div className="relative">
              {/* Badge */}
              <span className="mb-4 inline-flex items-center rounded-full border border-accent/40 bg-accent/20 px-2.5 py-0.5 text-[10px] font-medium tracking-wide text-accent sm:mb-6 sm:px-3 sm:py-1 sm:text-xs">
                Best Seller
              </span>

              {/* Title */}
              <h3 className="font-serif text-xl font-semibold text-primary-foreground sm:text-2xl md:text-3xl lg:text-4xl">
                Línea Alternativas
              </h3>

              {/* Description */}
              <p className="mt-3 max-w-md text-sm leading-relaxed text-primary-foreground/80 sm:mt-4 sm:text-base lg:text-lg">
                Fragancias inspiradas de altísima persistencia. 
                La mejor relación calidad-precio sin renunciar a la exclusividad.
              </p>

              {/* CTA */}
              <Link
                href="#"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent/80 sm:mt-8"
              >
                Descubrir colección
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

// ============================================
// BENEFICIOS SECTION
// ============================================
function BeneficiosSection() {
  const beneficios = [
    {
      icon: Headset,
      title: "Asesoramiento",
      description: "Te acompañamos en cada paso de tu compra.",
    },
    {
      icon: Package,
      title: "Envíos",
      description: "Envíos a todo el país con seguimiento.",
    },
    {
      icon: Wallet,
      title: "Descuentos",
      description: "10% de descuento abonando en efectivo o transferencia.",
    },
  ]

  return (
    <section id="asesoramiento" className="bg-background py-16 sm:py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 text-center sm:mb-16">
          <span className="mb-3 inline-block text-[10px] font-medium tracking-[0.2em] text-accent uppercase sm:mb-4 sm:text-xs">
            Beneficios
          </span>
          <h2 className="font-serif text-2xl font-semibold leading-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
            ¿Por qué elegirnos?
          </h2>
        </div>

        {/* Benefits Grid */}
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
          {beneficios.map((beneficio, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl bg-card p-6 text-center shadow-sm transition-all hover:shadow-lg sm:rounded-3xl sm:p-8 lg:p-10"
            >
              {/* Background Accent on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

              <div className="relative">
                {/* Icon Container */}
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent/20 sm:mb-6 sm:h-16 sm:w-16 sm:rounded-2xl">
                  <beneficio.icon className="h-5 w-5 sm:h-7 sm:w-7" strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h3 className="font-serif text-lg font-semibold text-foreground sm:text-xl">
                  {beneficio.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:mt-3 sm:text-base">
                  {beneficio.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================
// FOOTER
// ============================================
function Footer() {
  return (
    <footer className="border-t border-border/40 bg-[#EDE6DD]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="flex flex-col items-center justify-between gap-6 sm:gap-8 lg:flex-row">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-1.5 sm:gap-2">
            <span className="font-serif text-xl font-semibold tracking-wide text-foreground transition-colors group-hover:text-accent sm:text-2xl">
              DUNA
            </span>
            <span className="font-serif text-xs font-light tracking-widest text-muted-foreground sm:text-sm">
              Perfumes
            </span>
          </Link>

          {/* Social Links */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-card text-muted-foreground shadow-sm transition-all hover:bg-accent hover:text-card hover:shadow-md sm:h-12 sm:w-12"
              aria-label="Seguinos en Instagram"
            >
              <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-border/40 pt-6 sm:mt-12 sm:gap-4 sm:pt-8 lg:flex-row">
          <p className="text-center text-xs text-muted-foreground sm:text-left sm:text-sm">
            © {new Date().getFullYear()} DUNA Perfumes. Todos los derechos reservados.
          </p>
          <p className="text-[10px] text-muted-foreground/60 sm:text-xs">
            Desarrollado a medida
          </p>
        </div>
      </div>
    </footer>
  )
}

// ============================================
// MAIN PAGE
// ============================================
export default function DunaLandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <HistoriaSection />
        <ProductLinesSection />
        <BeneficiosSection />
      </main>
      <Footer />
    </div>
  )
}
