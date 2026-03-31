import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SmoothScroll } from '@/components/smooth-scroll'
import './globals.css'

const grainNoiseSvg = encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.88" numOctaves="4" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(#n)" opacity="0.52"/></svg>',
)

const grainOverlayStyle = {
  backgroundImage: `url("data:image/svg+xml,${grainNoiseSvg}")`,
  backgroundRepeat: 'repeat' as const,
}

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-serif',
  display: 'swap',
});

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'DUNA Perfumes | Perfumería Árabe de Alta Gama',
  description: 'Descubrí la exclusividad y el misterio de la auténtica perfumería árabe. Fragancias originales e inspiradas de altísima calidad.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      className={`${playfair.variable} ${inter.variable}`}
    >
      <body className="font-sans antialiased">
        <SmoothScroll>{children}</SmoothScroll>
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-100 opacity-[0.028]"
          style={grainOverlayStyle}
        />
        <Analytics />
      </body>
    </html>
  )
}
