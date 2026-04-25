import type { Metadata } from 'next';
import { getSettings } from '@/lib/db';
import { CheckoutForm } from './CheckoutForm';

export const metadata: Metadata = {
  title: 'Finalizar compra',
  description: 'Completá tus datos y recibí tu pedido DUNA en la puerta de tu casa.',
};

export default async function CheckoutPage() {
  const settings = await getSettings();
  return <CheckoutForm settings={settings} />;
}
