import { NextResponse } from 'next/server';
import { deleteProduct, getProductById, upsertProduct } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';
import type { Product } from '@/types';

export const runtime = 'nodejs';

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const product = await getProductById(params.id);
  if (!product) return NextResponse.json({ error: 'No encontrado' }, { status: 404 });
  return NextResponse.json({ product });
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }
  const body = await req.json();
  const current = await getProductById(params.id);
  if (!current) return NextResponse.json({ error: 'No encontrado' }, { status: 404 });
  const updated: Product = {
    ...current,
    ...body,
    id: current.id,
    updatedAt: new Date().toISOString(),
  };
  await upsertProduct(updated);
  return NextResponse.json({ product: updated });
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }
  await deleteProduct(params.id);
  return NextResponse.json({ ok: true });
}
