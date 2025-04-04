import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { APP_LOCALES, withLocaleUriPattern } from "./app/[locale]/constants";

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|api|favicon.ico).*)',
  ],
};

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const hostname = request.nextUrl.hostname;
  
  // Check if the path already has a locale
  const pathnameIsMissingLocale = APP_LOCALES.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Handle domain-specific routing
  if (hostname === 'carlsonmarc.com') {
    // If no locale in path, redirect to English
    if (pathnameIsMissingLocale) {
      return NextResponse.redirect(
        new URL(`/en${pathname}`, request.url)
      );
    }
  } else if (hostname === 'carlsonmarc.se') {
    // If no locale in path, redirect to Swedish
    if (pathnameIsMissingLocale) {
      return NextResponse.redirect(
        new URL(`/sv${pathname}`, request.url)
      );
    }
  } else {
    // For any other domain, default to English if no locale specified
    if (pathnameIsMissingLocale) {
      return NextResponse.redirect(
        new URL(`/en${pathname}`, request.url)
      );
    }
  }

  // If locale is specified in the path, let it through
  return NextResponse.next();
}
