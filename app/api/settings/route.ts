import { NextResponse } from 'next/server';
import { getSettings, saveSettings } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';
import type { SiteSettings } from '@/types';

export const runtime = 'nodejs';

export async function GET() {
  const settings = await getSettings();
  return NextResponse.json({ settings });
}

export async function PUT(req: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }
  const body = (await req.json()) as SiteSettings;
  if (!body || typeof body !== 'object' || !body.brandName) {
    return NextResponse.json({ error: 'Ajustes inválidos' }, { status: 400 });
  }
  // Normalize whatsappRaw from number
  const normalized: SiteSettings = {
    ...body,
    whatsappRaw: body.whatsappRaw || body.whatsappNumber.replace(/[^0-9]/g, ''),
  };
  await saveSettings(normalized);
  return NextResponse.json({ settings: normalized });
}
