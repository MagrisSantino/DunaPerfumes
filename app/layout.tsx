import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat';
import { ToastProvider } from '@/components/ui/Toast';
import { getContent, getSettings } from '@/lib/db';

const display = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return {
    title: {
      default: settings.metaTitle,
      template: `%s · ${settings.brandName}`,
    },
    description: settings.metaDescription,
    keywords: [
      'perfumes árabes',
      'perfumería árabe',
      'perfumes importados',
      'Córdoba',
      'Lattafa',
      'Armaf',
      'Afnan',
      'Yara',
      'Khamrah',
      'DUNA Perfumes',
    ],
    openGraph: {
      title: settings.metaTitle,
      description: settings.metaDescription,
      type: 'website',
      locale: 'es_AR',
      siteName: settings.brandName,
    },
    twitter: { card: 'summary_large_image', title: settings.metaTitle, description: settings.metaDescription },
    robots: { index: true, follow: true },
    icons: { icon: '/favicon.svg' },
  };
}

export const viewport: Viewport = {
  themeColor: '#F5EFE6',
  width: 'device-width',
  initialScale: 1,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [settings, content] = await Promise.all([getSettings(), getContent()]);
  return (
    <html lang="es-AR" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col antialiased bg-cream text-espresso">
        <ToastProvider>
          {content.announcement.enabled && (
            <AnnouncementBar items={content.announcement.items} />
          )}
          <Header brandName={settings.brandName} />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer settings={settings} content={content} />
          <WhatsAppFloat phone={settings.whatsappRaw} />
        </ToastProvider>
      </body>
    </html>
  );
}
