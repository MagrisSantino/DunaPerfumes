"use client"

import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion"
import { Headset, Package, Wallet, Instagram, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { ComponentProps, ReactNode } from "react"
import { useRef } from "react"

const perfumeImageBlur =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="

const productLineImages = {
  originales: "/yara.png",
  alternativas: "/club.png",
} as const

const heroTextContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const heroTextChildVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: "easeOut" as const,
    },
  },
}

const heroSmokeTransition = {
  duration: 8,
  repeat: Infinity,
  ease: "easeInOut" as const,
}

const historiaSpringTransition = {
  type: "spring" as const,
  stiffness: 90,
  damping: 42,
  mass: 1,
}

const historiaContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.13,
    },
  },
}

const historiaTextVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: historiaSpringTransition,
  },
}

const historiaLineVariants = {
  hidden: { opacity: 0, scaleX: 0 },
  visible: {
    opacity: 1,
    scaleX: 1,
    transition: historiaSpringTransition,
  },
}

const productLinesCardViewport = { once: true, margin: "-80px" } as const

const productCardScrollEase = [0.22, 0.99, 0.37, 1] as [number, number, number, number]

const productCardScrollOpacity = {
  duration: 0.72,
  ease: productCardScrollEase,
}

const productCardYMotion = {
  type: "tween" as const,
  duration: 0.56,
  ease: [0.2, 0.94, 0.36, 1] as [number, number, number, number],
}

const productCardHoverShadowMotion = {
  type: "tween" as const,
  duration: 0.48,
  ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
}

const productCardHoverShadow =
  "0 22px 44px -10px rgba(0, 0, 0, 0.14), 0 12px 24px -14px rgba(0, 0, 0, 0.08)"

const productCardHoverShadowPrimary =
  "0 22px 44px -10px rgba(0, 0, 0, 0.22), 0 12px 24px -14px rgba(0, 0, 0, 0.12)"

const beneficiosGridViewport = { once: true, margin: "-80px" } as const

const beneficiosGridContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.11,
    },
  },
}

const beneficioCardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.52,
      ease: [0.22, 0.99, 0.37, 1] as [number, number, number, number],
    },
  },
}

const brandTickerLogos: ReadonlyArray<{
  src: string
  alt: string
}> = [
  { src: "/brands/lattafa.png", alt: "Lattafa" },
  { src: "/brands/afnan.png", alt: "Afnan" },
  { src: "/brands/armaf.png", alt: "Armaf" },
  { src: "/brands/gissah.png", alt: "Gissah" },
  { src: "/brands/bharara.png", alt: "Bharara" },
  { src: "/brands/zimaya.png", alt: "Zimaya" },
  { src: "/brands/french-avenue.png", alt: "French Avenue" },
]

type MagneticHeroLinkProps = ComponentProps<typeof Link> & {
  children: ReactNode
}

function MagneticHeroLink({ children, className, href, ...linkProps }: MagneticHeroLinkProps) {
  const zoneRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const spring = { stiffness: 220, damping: 28, mass: 0.35 }
  const springX = useSpring(x, spring)
  const springY = useSpring(y, spring)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = zoneRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const cx = r.left + r.width / 2
    const cy = r.top + r.height / 2
    const strength = 0.32
    x.set((e.clientX - cx) * strength)
    y.set((e.clientY - cy) * strength)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <div
      ref={zoneRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative inline-flex w-full justify-center sm:w-auto"
    >
      <motion.span
        style={{ x: springX, y: springY }}
        className="inline-flex w-full justify-center sm:w-auto"
      >
        <Link href={href} className={className} {...linkProps}>
          {children}
        </Link>
      </motion.span>
    </div>
  )
}

function BrandTicker() {
  return (
    <section className="bg-muted pt-0 pb-6 lg:pb-8" aria-label="Marcas destacadas">
      <div className="overflow-hidden py-3 sm:py-4">
        <motion.div
          className="flex w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 42,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="flex shrink-0 items-center gap-12 px-6 sm:gap-20 sm:px-10"
              aria-hidden={copy === 1}
            >
              {brandTickerLogos.map(({ src, alt }) => {
                return (
                  <div
                    key={`${copy}-${src}`}
                    className="group/logo flex h-20 w-[300px] shrink-0 items-center justify-center sm:h-24 sm:w-[380px] lg:h-28 lg:w-[440px]"
                  >
                    <Image
                      src={src}
                      alt={alt}
                      width={360}
                      height={96}
                      sizes="(max-width: 640px) 200px, (max-width: 1024px) 260px, 320px"
                      className="h-20 w-auto object-contain grayscale opacity-60 transition-all duration-500 hover:opacity-100 sm:h-24 lg:h-28"
                    />
                  </div>
                )
              })}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ============================================
// NAVBAR COMPONENT
// ============================================
function Navbar() {
  const { scrollY } = useScroll()
  const dunaColor = useTransform(scrollY, [0, 96], ["#1C1917", "#0F0C0A"])

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border/40">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 sm:py-2.5 lg:px-8">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-1.5 sm:gap-2">
          <motion.span
            style={{ color: dunaColor }}
            className="transition-[filter,color] duration-500 ease-out"
          >
            <Image
              src="/logo.png"
              alt="Duna Perfumes"
              width={588}
              height={588}
              priority
              className="h-12 w-auto filter grayscale opacity-90"
            />
          </motion.span>
        </Link>

        {/* CTA Button */}
        <Link
          href="#catalogo"
          className="group flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg sm:gap-2 sm:px-4 sm:py-2 sm:text-sm"
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
    <section className="relative overflow-hidden bg-linear-to-b from-background via-muted to-background">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/5 blur-3xl sm:-right-32 sm:-top-32 sm:h-96 sm:w-96"
          animate={{
            scale: [1, 1.05, 1],
            y: [0, 15, 0],
          }}
          transition={heroSmokeTransition}
        />
        <motion.div
          className="absolute -left-20 bottom-0 h-52 w-52 rounded-full bg-accent/10 blur-3xl sm:-left-32 sm:h-80 sm:w-80"
          animate={{
            scale: [1, 1.05, 1],
            y: [0, 15, 0],
          }}
          transition={{ ...heroSmokeTransition, delay: 1.5 }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-32">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          variants={heroTextContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div
            className="mb-6 inline-flex items-center rounded-full border border-accent/30 bg-card/60 px-3 py-1 backdrop-blur-sm sm:mb-8 sm:px-4 sm:py-1.5"
            variants={heroTextChildVariants}
          >
            <span className="text-[10px] font-medium tracking-widest text-accent uppercase sm:text-xs">
              Perfumería Árabe Premium
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            className="font-serif text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-balance"
            variants={heroTextChildVariants}
          >
            Dejá huella con{" "}
            <span className="text-accent">cada paso.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="mx-auto mt-4 max-w-xl px-2 text-base leading-relaxed text-muted-foreground sm:mt-6 sm:px-0 sm:text-lg lg:text-xl text-pretty"
            variants={heroTextChildVariants}
          >
            Descubrí la exclusividad y el misterio de la auténtica perfumería árabe.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="mt-8 flex flex-col items-center justify-center gap-3 px-4 sm:mt-10 sm:flex-row sm:gap-4 sm:px-0"
            variants={heroTextChildVariants}
          >
            <MagneticHeroLink
              href="#catalogo"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl sm:w-auto sm:px-8 sm:py-4 sm:text-base"
            >
              Explorar fragancias
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </MagneticHeroLink>
            <MagneticHeroLink
              href="#asesoramiento"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-primary/20 bg-transparent px-6 py-3.5 text-sm font-medium text-foreground transition-all hover:border-primary/40 hover:bg-card sm:w-auto sm:px-8 sm:py-4 sm:text-base"
            >
              Asesoramiento personalizado
            </MagneticHeroLink>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-background to-transparent sm:h-24" />
    </section>
  )
}

// ============================================
// NUESTRA HISTORIA SECTION
// ============================================
function HistoriaSection() {
  const historiaViewport = { once: true, margin: "-100px" } as const

  return (
    <section className="bg-background py-16 sm:py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          variants={historiaContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={historiaViewport}
        >
          {/* Small Label */}
          <motion.span
            className="mb-3 inline-block text-[10px] font-medium tracking-[0.2em] text-accent uppercase sm:mb-4 sm:text-xs"
            variants={historiaTextVariants}
          >
            Nuestra Esencia
          </motion.span>

          {/* Title */}
          <motion.h2
            className="font-serif text-2xl font-semibold leading-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl text-balance"
            variants={historiaTextVariants}
          >
            Así nació <span className="text-accent">DUNA</span>
          </motion.h2>

          {/* Decorative Line */}
          <motion.div
            className="mx-auto my-6 h-px w-12 origin-center bg-accent/40 sm:my-8 sm:w-16"
            variants={historiaLineVariants}
          />

          {/* Story Text */}
          <motion.p
            className="px-2 text-base leading-relaxed text-muted-foreground sm:px-0 sm:text-lg text-pretty"
            variants={historiaTextVariants}
          >
            Somos <span className="font-medium text-foreground">Luz y Rodri</span>. 
            Lo que empezó como una curiosidad por los aromas profundos y exóticos, 
            nos impulsó a traer algo distinto a Córdoba.
          </motion.p>
          <motion.p
            className="mt-4 px-2 text-base leading-relaxed text-muted-foreground sm:mt-6 sm:px-0 sm:text-lg text-pretty"
            variants={historiaTextVariants}
          >
            Para nosotros, un perfume no es solo una fragancia, es una{" "}
            <span className="font-medium text-accent">marca personal</span>. 
            Importamos lo mejor de la perfumería árabe para que encuentres 
            la esencia que te hace único/a.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}

function ProductLineCollectionLink() {
  return (
    <Link
      href="#"
      className="group/line relative mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent/90 sm:mt-8"
    >
      <span className="relative inline-block pb-0.5">
        Descubrir colección
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-1/2 h-px w-full origin-center -translate-x-1/2 scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover/line:scale-x-100"
        />
      </span>
      <ArrowRight className="h-4 w-4 transition-transform group-hover/line:translate-x-1" />
    </Link>
  )
}

// ============================================
// LÍNEAS DE PRODUCTO SECTION
// ============================================
function ProductLinesSection() {
  return (
    <section id="catalogo" className="bg-muted pt-16 pb-8 sm:pt-20 sm:pb-10 lg:pt-32 lg:pb-12">
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
          <motion.article
            className="group relative overflow-hidden rounded-2xl border border-border/40 bg-card p-6 shadow-sm transition-[border-color,box-shadow] duration-500 ease-out hover:border-accent/50 sm:rounded-3xl sm:p-8 lg:p-10"
            initial={{ opacity: 0, y: 56 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={productLinesCardViewport}
            transition={{
              opacity: productCardScrollOpacity,
              y: productCardYMotion,
              boxShadow: productCardHoverShadowMotion,
            }}
            whileHover={{
              y: -8,
              boxShadow: productCardHoverShadow,
            }}
          >
            <div className="absolute -right-16 -top-16 z-0 h-32 w-32 rounded-full bg-accent/10 transition-transform group-hover:scale-150 sm:-right-20 sm:-top-20 sm:h-40 sm:w-40" />

            <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center lg:gap-10">
              <div className="order-2 flex flex-col lg:order-1">
                <span className="mb-4 inline-flex w-fit items-center rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-[10px] font-medium tracking-wide text-accent sm:mb-6 sm:px-3 sm:py-1 sm:text-xs">
                  Premium
                </span>

                <h3 className="font-serif text-xl font-semibold text-foreground sm:text-2xl md:text-3xl lg:text-4xl">
                  Línea Originales
                </h3>

                <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground sm:mt-4 sm:text-base lg:text-lg">
                  Fragancias 100% originales con sello de autenticidad. Las marcas más exclusivas
                  del mercado árabe a tu alcance.
                </p>

                <ProductLineCollectionLink />
              </div>

              <div className="order-1 lg:order-2">
                <div className="relative mx-auto aspect-3/4 w-full max-w-[260px] overflow-hidden rounded-2xl border border-border/45 bg-muted/60 p-8 shadow-inner sm:max-w-[300px] sm:p-10 lg:mx-0 lg:max-w-none">
                  <Image
                    src={productLineImages.originales}
                    alt="Frasco de perfume — Línea Originales"
                    fill
                    sizes="(max-width: 1024px) 280px, 50vw"
                    placeholder="blur"
                    blurDataURL={perfumeImageBlur}
                    className="object-contain object-[60%_50%] transition-transform duration-650 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05] group-hover:-translate-y-2.5"
                  />
                </div>
              </div>
            </div>
          </motion.article>

          {/* Card 2 - Alternativas */}
          <motion.article
            className="group relative overflow-hidden rounded-2xl border border-primary-foreground/18 bg-primary p-6 shadow-sm transition-[border-color,box-shadow] duration-500 ease-out hover:border-accent/55 sm:rounded-3xl sm:p-8 lg:p-10"
            initial={{ opacity: 0, y: 56 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={productLinesCardViewport}
            transition={{
              opacity: { ...productCardScrollOpacity, delay: 0.2 },
              y: { ...productCardYMotion, delay: 0.2 },
              boxShadow: productCardHoverShadowMotion,
            }}
            whileHover={{
              y: -8,
              boxShadow: productCardHoverShadowPrimary,
            }}
          >
            <div className="absolute -right-16 -top-16 z-0 h-32 w-32 rounded-full bg-accent/20 transition-transform group-hover:scale-150 sm:-right-20 sm:-top-20 sm:h-40 sm:w-40" />

            <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center lg:gap-10">
              <div className="order-2 flex flex-col lg:order-1">
                <span className="mb-4 inline-flex w-fit items-center rounded-full border border-accent/40 bg-accent/20 px-2.5 py-0.5 text-[10px] font-medium tracking-wide text-accent sm:mb-6 sm:px-3 sm:py-1 sm:text-xs">
                  Best Seller
                </span>

                <h3 className="font-serif text-xl font-semibold text-primary-foreground sm:text-2xl md:text-3xl lg:text-4xl">
                  Línea Alternativas
                </h3>

                <p className="mt-3 max-w-md text-sm leading-relaxed text-primary-foreground/80 sm:mt-4 sm:text-base lg:text-lg">
                  Fragancias inspiradas de altísima persistencia. La mejor relación calidad-precio
                  sin renunciar a la exclusividad.
                </p>

                <ProductLineCollectionLink />
              </div>

              <div className="order-1 lg:order-2">
                <div className="relative mx-auto aspect-3/4 w-full max-w-[260px] overflow-hidden rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 p-8 shadow-inner sm:max-w-[300px] sm:p-10 lg:mx-0 lg:max-w-none">
                  <Image
                    src={productLineImages.alternativas}
                    alt="Frasco de perfume — Línea Alternativas"
                    fill
                    sizes="(max-width: 1024px) 280px, 50vw"
                    placeholder="blur"
                    blurDataURL={perfumeImageBlur}
                    className="object-contain transition-transform duration-650 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05] group-hover:-translate-y-2.5"
                  />
                </div>
              </div>
            </div>
          </motion.article>
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
        <motion.div
          className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8"
          variants={beneficiosGridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={beneficiosGridViewport}
        >
          {beneficios.map((beneficio, index) => (
            <motion.div
              key={index}
              className="group relative overflow-hidden rounded-2xl bg-card p-6 text-center shadow-sm transition-shadow hover:shadow-lg sm:rounded-3xl sm:p-8 lg:p-10"
              variants={beneficioCardVariants}
            >
              {/* Background Accent on Hover */}
              <div className="absolute inset-0 bg-linear-to-br from-accent/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

              <div className="relative">
                {/* Icon Container */}
                <motion.div
                  className="mx-auto mb-4 flex h-12 w-12 origin-center items-center justify-center rounded-xl bg-accent/10 text-accent transition-[transform,background-color] duration-300 ease-out group-hover:scale-[1.1] group-hover:bg-accent/20 sm:mb-6 sm:h-16 sm:w-16 sm:rounded-2xl"
                >
                  <beneficio.icon className="h-5 w-5 sm:h-7 sm:w-7" strokeWidth={1.5} />
                </motion.div>

                {/* Title */}
                <h3 className="font-serif text-lg font-semibold text-foreground sm:text-xl">
                  {beneficio.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:mt-3 sm:text-base">
                  {beneficio.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ============================================
// FOOTER
// ============================================
function Footer() {
  return (
    <footer className="border-t border-border/40 bg-muted">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="flex flex-col items-center justify-between gap-6 sm:gap-8 lg:flex-row">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-1.5 sm:gap-2">
            <Image
              src="/logo.png"
              alt="Duna Perfumes"
              width={588}
              height={588}
              className="h-16 w-auto filter grayscale opacity-90 transition-opacity duration-300 group-hover:opacity-100"
            />
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
        <BrandTicker />
        <BeneficiosSection />
      </main>
      <Footer />
    </div>
  )
}
