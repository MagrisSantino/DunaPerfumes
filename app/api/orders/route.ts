import { NextResponse } from 'next/server';
import { createOrder, decrementStock, getOrders, getProducts } from '@/lib/db';
import { generateId, generateOrderCode } from '@/lib/utils';
import type { Order, OrderItem, PaymentMethod } from '@/types';
import { isAuthenticated } from '@/lib/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface OrderPayload {
  customer: { name: string; phone: string; email?: string; dni?: string };
  shipping: {
    method: 'envio' | 'retiro';
    address?: string;
    city?: string;
    zone?: string;
    notes?: string;
  };
  items: Array<{ productId: string; quantity: number }>;
  paymentMethod: PaymentMethod;
  notes?: string;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as OrderPayload;
    if (!body?.items?.length) {
      return NextResponse.json({ error: 'Carrito vacío' }, { status: 400 });
    }
    if (!body.customer?.name || !body.customer?.phone) {
      return NextResponse.json({ error: 'Completá tus datos' }, { status: 400 });
    }

    const catalog = await getProducts();
    const items: OrderItem[] = [];
    for (const it of body.items) {
      const p = catalog.find((x) => x.id === it.productId);
      if (!p) {
        return NextResponse.json({ error: `Producto no disponible: ${it.productId}` }, { status: 400 });
      }
      if (p.stock < it.quantity) {
        return NextResponse.json(
          { error: `Sin stock suficiente de ${p.brand} ${p.model}. Disponibles: ${p.stock}` },
          { status: 400 },
        );
      }
      const unitPrice =
        body.paymentMethod === 'efectivo' || body.paymentMethod === 'transferencia'
          ? p.cashPrice
          : p.price;
      items.push({
        productId: p.id,
        brand: p.brand,
        model: p.model,
        size: p.size,
        quantity: it.quantity,
        unitPrice,
        subtotal: unitPrice * it.quantity,
      });
    }

    const subtotalFullPrice = items.reduce((acc, i) => {
      const p = catalog.find((x) => x.id === i.productId)!;
      return acc + p.price * i.quantity;
    }, 0);
    const subtotal = items.reduce((acc, i) => acc + i.subtotal, 0);
    const discount = subtotalFullPrice - subtotal;
    const shippingCost = 0; // Calculated/confirmed manually after order
    const total = subtotal + shippingCost;

    const order: Order = {
      id: generateId('ord_'),
      code: generateOrderCode(),
      customer: body.customer,
      shipping: body.shipping,
      items,
      subtotal: subtotalFullPrice,
      discount,
      shippingCost,
      total,
      paymentMethod: body.paymentMethod,
      status: 'pendiente',
      notes: body.notes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await createOrder(order);
    await decrementStock(items.map((i) => ({ productId: i.productId, quantity: i.quantity })));

    return NextResponse.json({ order }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'No pudimos crear el pedido' }, { status: 500 });
  }
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }
  const orders = await getOrders();
  return NextResponse.json({ orders });
}
