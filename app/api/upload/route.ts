import { NextResponse } from 'next/server';
import path from 'node:path';
import fs from 'node:fs/promises';
import { isAuthenticated } from '@/lib/auth';
import { generateId } from '@/lib/utils';

export const runtime = 'nodejs';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');
const ALLOWED = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'];
const MAX = 8 * 1024 * 1024; // 8 MB

export async function POST(req: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }
  try {
    const form = await req.formData();
    const file = form.get('file');
    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'Archivo faltante' }, { status: 400 });
    }
    if (!ALLOWED.includes(file.type)) {
      return NextResponse.json({ error: 'Formato no soportado' }, { status: 415 });
    }
    if (file.size > MAX) {
      return NextResponse.json({ error: 'Archivo demasiado grande (máx 8MB)' }, { status: 413 });
    }
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
    const ext = file.name.split('.').pop() || 'jpg';
    const filename = `${generateId()}.${ext}`;
    const buf = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(path.join(UPLOAD_DIR, filename), buf);
    return NextResponse.json({ url: `/uploads/${filename}` }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Error al subir archivo' }, { status: 500 });
  }
}
