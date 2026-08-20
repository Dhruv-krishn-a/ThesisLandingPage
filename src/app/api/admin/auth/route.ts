import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';

const SECRET_KEY = new TextEncoder().encode(process.env.ADMIN_SECRET || 'super-secure-fallback-secret-wrirk');

// Secure credentials from environment variables
const VALID_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const VALID_PASSWORD = process.env.ADMIN_PASSWORD || 'Wrirk@2025!';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, password } = body;

    // Validate ID & Password
    if (username !== VALID_USERNAME || password !== VALID_PASSWORD) {
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    }

    // Issue JWT Cookie on successful authentication
    const token = await new SignJWT({ user: 'admin', role: 'superadmin' })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('12h')
      .sign(SECRET_KEY);

    const response = NextResponse.json({ success: true, message: 'Login successful' });
    
    // Set HTTP-only secure cookie
    response.cookies.set({
      name: 'admin_token',
      value: token,
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 12, // 12 hours
      sameSite: 'lax',
    });

    return response;

  } catch (error) {
    console.error('Auth Error:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
