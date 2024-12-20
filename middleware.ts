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
    // Check if the request already contains a locale
    const matches = withLocaleUriPattern.exec(req.nextUrl.pathname);
    if (!matches) {
      const langHeaders = { "accept-language": req.headers.get("accept-language") || "" };
      const languages = new Negotiator({ headers: langHeaders }).languages();
      const locale = match(languages, APP_LOCALES, "en"); // Default to "en" if no match

      let appOrigin = process.env.NEXT_PUBLIC_APP_ORIGIN || "";

      // Ensure appOrigin ends correctly
      if (!appOrigin.endsWith("/")) {
        appOrigin += "/";
      }

      // Build the destination URL, preserving the original path and query
      const destinationUrl = new URL(req.nextUrl.href);
      destinationUrl.pathname = `/${locale}${req.nextUrl.pathname}`;
      destinationUrl.search = req.nextUrl.search; // Keep query params

      console.log("Redirecting to:", destinationUrl.href);

      return NextResponse.redirect(destinationUrl);
    }

    // Proceed with the request if it already has a locale
    return NextResponse.next();
  } catch (error) {
    console.error("Middleware Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
