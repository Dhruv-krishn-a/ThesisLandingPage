import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET_KEY = new TextEncoder().encode(process.env.ADMIN_SECRET || 'super-secure-fallback-secret-wrirk');

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Only protect the /admin routes
  if (!path.startsWith('/admin')) {
    return NextResponse.next();
  }
  
  // Skip protecting the login route itself and auth APIs
  if (path === '/admin/login' || path.startsWith('/api/admin/auth')) {
    return NextResponse.next();
  }

  const token = request.cookies.get('admin_token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  try {
    // Verify the JWT token
    await jwtVerify(token, SECRET_KEY);
    return NextResponse.next();
  } catch (error) {
    // If token is invalid or expired
    const response = NextResponse.redirect(new URL('/admin/login', request.url));
    response.cookies.delete('admin_token');
    return response;
  }
}

export const config = {
  matcher: ['/admin/:path*'],
};
