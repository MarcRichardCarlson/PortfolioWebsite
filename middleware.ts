import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { APP_LOCALES, withLocaleUriPattern } from "./app/[locale]/constants";

export const config = {
  matcher: "/((?!api|_static|_next|debug|.well-known|apple|safari|android|mstile|site.webmanifest|browserconfig.xml|sitemap.xml|robots.txt|favicon|(?:[a-z]{2})/callbacks).*)",
};

export async function middleware(req: NextRequest) {
  try {
    // Create response
    let response: NextResponse;

    // Check if the request already contains a locale
    const matches = withLocaleUriPattern.exec(req.nextUrl.pathname);
    if (!matches) {
      const langHeaders = { "accept-language": req.headers.get("accept-language") || "" };
      const languages = new Negotiator({ headers: langHeaders }).languages();
      const locale = match(languages, APP_LOCALES, "en");

      let appOrigin = process.env.APP_ORIGIN || "";

      if (!appOrigin.endsWith("/")) {
        appOrigin += "/";
      }

      const destinationUrl = new URL(req.nextUrl.href);
      destinationUrl.pathname = `/${locale}${req.nextUrl.pathname}`;
      destinationUrl.search = req.nextUrl.search;

      response = NextResponse.redirect(destinationUrl);
    } else {
      response = NextResponse.next();
    }

    // Add security headers
    const headers = response.headers;

    // Content Security Policy
    headers.set(
      'Content-Security-Policy',
      "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://api.openweathermap.org;"
    );

    // Other security headers
    headers.set('X-DNS-Prefetch-Control', 'on');
    headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    headers.set('X-Frame-Options', 'SAMEORIGIN');
    headers.set('X-Content-Type-Options', 'nosniff');
    headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

    return response;
  } catch (error) {
    console.error("Middleware Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
