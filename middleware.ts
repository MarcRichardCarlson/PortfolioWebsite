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
    // match user's locale (if needed)
    let matches = withLocaleUriPattern.exec(req.nextUrl.pathname);
    if (matches == null) {
      let langHeaders = { "accept-language": req.headers.get("accept-language")! };
      let languages = new Negotiator({ headers: langHeaders }).languages();
      let locale = match(languages, APP_LOCALES, "en");
      let appOrigin = process.env.NEXT_PUBLIC_APP_ORIGIN;

      if (!appOrigin) {
        throw new Error("NEXT_PUBLIC_APP_ORIGIN is not set");
      }

      // Construct the destination URL
      let destinationUrl = `${appOrigin}/${locale}${req.nextUrl.pathname}`;
      console.log('Destination URL:', destinationUrl);

      let destination = new URL(destinationUrl);
      return NextResponse.redirect(destination + req.nextUrl.search);
    }
  } catch (error) {
    console.error("Error in middleware:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}