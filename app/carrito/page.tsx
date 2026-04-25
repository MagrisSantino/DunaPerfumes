import type { Metadata } from 'next';
import { CartView } from './CartView';

export const metadata: Metadata = {
  title: 'Carrito',
  description: 'Revisá los productos que seleccionaste y finalizá tu compra.',
};

export default function CarritoPage() {
  return <CartView />;
}
