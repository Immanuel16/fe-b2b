import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
export function middleware(request: NextRequest) {
  const token = cookies().get('token');
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login'],
};
