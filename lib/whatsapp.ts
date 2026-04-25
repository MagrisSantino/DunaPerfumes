import type { CartItem, Order, SiteSettings } from '@/types';
import { formatPrice } from './utils';

export function buildWhatsAppCartMessage(items: CartItem[], subtotal: number, discount: number, total: number, paymentMethod: string, settings: SiteSettings) {
  const lines: string[] = [];
  lines.push(`*Hola! Quiero hacer un pedido en ${settings.brandName}* 🌙`);
  lines.push('');
  lines.push('*Productos:*');
  items.forEach((i) => {
    lines.push(`• ${i.brand} — ${i.model} (${i.size}) x${i.quantity}  ${formatPrice(i.price * i.quantity)}`);
  });
  lines.push('');
  lines.push(`*Subtotal:* ${formatPrice(subtotal)}`);
  if (discount > 0) lines.push(`*Descuento efectivo:* -${formatPrice(discount)}`);
  lines.push(`*Total:* ${formatPrice(total)}`);
  lines.push(`*Forma de pago:* ${paymentMethod}`);
  lines.push('');
  lines.push('¡Gracias! Espero confirmación 🧡');
  return lines.join('\n');
}

export function buildOrderConfirmationMessage(order: Order, settings: SiteSettings) {
  const lines: string[] = [];
  lines.push(`*Pedido ${order.code} — ${settings.brandName}* 🌙`);
  lines.push('');
  lines.push(`*Cliente:* ${order.customer.name}`);
  if (order.customer.phone) lines.push(`*Teléfono:* ${order.customer.phone}`);
  lines.push('');
  lines.push('*Detalle:*');
  order.items.forEach((i) => {
    lines.push(`• ${i.brand} — ${i.model} (${i.size}) x${i.quantity}  ${formatPrice(i.unitPrice * i.quantity)}`);
  });
  lines.push('');
  lines.push(`*Subtotal:* ${formatPrice(order.subtotal)}`);
  if (order.discount > 0) lines.push(`*Descuento:* -${formatPrice(order.discount)}`);
  if (order.shippingCost > 0) lines.push(`*Envío:* ${formatPrice(order.shippingCost)}`);
  lines.push(`*Total:* ${formatPrice(order.total)}`);
  lines.push('');
  lines.push(`*Pago:* ${order.paymentMethod}`);
  lines.push(`*Envío:* ${order.shipping.method === 'envio' ? `Domicilio — ${order.shipping.address}, ${order.shipping.city}` : 'Retiro en punto'}`);
  if (order.shipping.notes) lines.push(`*Notas:* ${order.shipping.notes}`);
  return lines.join('\n');
}

export function buildWhatsAppUrl(phone: string, text: string) {
  const clean = phone.replace(/[^0-9]/g, '');
  return `https://wa.me/${clean}?text=${encodeURIComponent(text)}`;
}
