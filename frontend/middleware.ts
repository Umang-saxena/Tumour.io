import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/auth(.*)",   // auth routes
  "/api/(.*)",   // public APIs
]);

export default clerkMiddleware(async (auth, req) => {
  // Check if it's a public route first to avoid unnecessary auth calls
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.redirect(new URL("/auth", req.url));
    }

    return NextResponse.next();
  } catch (error) {
    // Handle auth errors gracefully
    console.error("Auth error in middleware:", error);
    return NextResponse.redirect(new URL("/auth", req.url));
  }
});

export const config = {
  matcher: [
    // Skip all internal paths (_next, static files)
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
