import createMiddleware from "next-intl/middleware";
import {localePrefix, locales} from "@/components/localeConfig";
import {clerkMiddleware, createRouteMatcher} from "@clerk/nextjs/server";
import {NextResponse} from "next/server";

const isProtectedRoute = createRouteMatcher([
  '/admin',
  '/admin/(.*)',
]);

const intlMiddleware = createMiddleware({
  defaultLocale: 'de',
  localePrefix,
  locales
});

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) {
    auth().protect();
    return NextResponse.next();
  }

  return intlMiddleware(req);
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(de|en|ru)/:path*', "/admin/:path*", "/dashboard/:path*"]
};