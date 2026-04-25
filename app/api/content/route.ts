import { NextResponse } from 'next/server';
import { getContent, saveContent } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';
import type { SiteContent } from '@/types';

export const runtime = 'nodejs';

export async function GET() {
  const content = await getContent();
  return NextResponse.json({ content });
}

export async function PUT(req: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }
  const body = (await req.json()) as SiteContent;
  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'Contenido inválido' }, { status: 400 });
  }
  await saveContent(body);
  return NextResponse.json({ content: body });
}
