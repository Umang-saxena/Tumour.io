// // import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
// // import { NextResponse } from "next/server";

// // const isPublicRoute = createRouteMatcher([
// //   "/",
// //   "/auth(.*)",   // auth routes
// //   "/api/(.*)",   // public APIs
// // ]);

// // export default clerkMiddleware(async (auth, req) => {
// //   // Check if it's a public route first to avoid unnecessary auth calls
// //   if (isPublicRoute(req)) {
// //     return NextResponse.next();
// //   }

// //   try {
// //     const { userId } = await auth();

// //     if (!userId) {
// //       return NextResponse.redirect(new URL("/auth", req.url));
// //     }

// //     return NextResponse.next();
// //   } catch (error) {
// //     // Handle auth errors gracefully
// //     console.error("Auth error in middleware:", error);
// //     return NextResponse.redirect(new URL("/auth", req.url));
// //   }
// // });

// // export const config = {
// //   matcher: [
// //     // Skip all internal paths (_next, static files)
// //     "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
// //     // Always run for API routes
// //     "/(api|trpc)(.*)",
// //   ],
// //   runtime: 'nodejs',
// // };





// import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// const isPublicRoute = createRouteMatcher([
//   '/',
//   '/auth/(.*)', // auth routes
//   '/api/(.*)', // public APIs
// ])

// export default clerkMiddleware(async (auth, req) => {
//   if (!isPublicRoute(req)) {
//     await auth.protect()
//   }
// })

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     // Always run for API routes
//     '/(api|trpc)(.*)',
//   ],
// }


import { clerkMiddleware } from '@clerk/nextjs/server'

export default clerkMiddleware()

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}