import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Panel administrador',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <div className="bg-sand-100 min-h-screen">{children}</div>;
}
