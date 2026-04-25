import 'server-only';
import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';

const COOKIE = 'duna_session';
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function secret() {
  const key = process.env.AUTH_SECRET;
  if (!key || key.length < 24) {
    throw new Error('AUTH_SECRET missing or too short (min 24 chars) — revisa .env.local');
  }
  return new TextEncoder().encode(key);
}

export async function signSession(payload: { u: string }) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE}s`)
    .sign(secret());
}

export async function verifySession(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret());
    return payload as { u: string; iat: number; exp: number };
  } catch {
    return null;
  }
}

export function setSessionCookie(token: string) {
  cookies().set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: MAX_AGE,
  });
}

export function clearSessionCookie() {
  cookies().delete(COOKIE);
}

export async function getSession() {
  const token = cookies().get(COOKIE)?.value;
  if (!token) return null;
  return await verifySession(token);
}

export async function isAuthenticated() {
  return (await getSession()) !== null;
}

export function checkCredentials(username: string, password: string) {
  const u = process.env.ADMIN_USERNAME || 'duna';
  const p = process.env.ADMIN_PASSWORD || 'duna2026';
  return username === u && password === p;
}

export async function requireAuth() {
  if (!(await isAuthenticated())) {
    const { redirect } = await import('next/navigation');
    redirect('/admin/login');
  }
}

export const AUTH_COOKIE = COOKIE;
