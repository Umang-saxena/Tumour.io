import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/auth(.*)",   // auth routes
  "/api/(.*)",   // public APIs
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();   // ✅ Await the promise

  if (isPublicRoute(req)) return NextResponse.next();

  if (!userId) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Exclude static files/_next
    "/((?!_next|.*\\..*).*)",
    "/(api|trpc)(.*)",
  ],
};
