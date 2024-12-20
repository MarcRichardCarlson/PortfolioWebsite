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
    if (matches == null) {
      // Negotiate locale from headers
      const langHeaders = { "accept-language": req.headers.get("accept-language") || "" };
      const languages = new Negotiator({ headers: langHeaders }).languages();
      const locale = match(languages, APP_LOCALES, "en"); // Default to "en" if no match

      // Get the app origin
      let appOrigin = process.env.NEXT_PUBLIC_APP_ORIGIN || "";

      // Validate and sanitize the appOrigin
      if (!/^https?:\/\//i.test(appOrigin)) {
        appOrigin = `https://${appOrigin}`;
      }
      if (!appOrigin.endsWith("/")) {
        appOrigin += "/";
      }

      // Construct the redirection URL
      const destinationUrl =
        req.nextUrl.pathname === "/"
          ? `${appOrigin}${locale}/`
          : `${appOrigin}${locale}${req.nextUrl.pathname}${req.nextUrl.search}`;

      // Log the redirection for debugging purposes
      //console.log("Redirecting to:", destinationUrl);

      // Perform the redirect
      return NextResponse.redirect(new URL(destinationUrl));
    }

    // If a locale is already present, proceed with the request
    return NextResponse.next();
  } catch (error) {
    console.error("Error in middleware:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
