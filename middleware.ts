import { clerkMiddleware , createRouteMatcher, auth} from '@clerk/nextjs/server'
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher([
  '/',
  '/auth'
]);

export default clerkMiddleware(async (auth, request) => { 
  if (isPublicRoute(request)) return;

  const { userId } = await auth();
  if (!userId) {
     return NextResponse.redirect(new URL('/auth', request.url));
  }

  return NextResponse.next();
});


export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};