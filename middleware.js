import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { NextResponse } from 'next/server';

export async function middleware(request) {
  const { isAuthenticated } = getKindeServerSession();
  // If user is NOT authenticated, redirect to login
  if (!(await isAuthenticated())) {
    return NextResponse.redirect(
      new URL('/api/auth/login?post_login_redirect_url=/', request.url)
    );
  }

  // Otherwise, allow access or redirect somewhere else if needed
  return NextResponse.next();
}

export const config = {
  matcher: ['/details/:path*'], // middleware applies only to these routes
};
