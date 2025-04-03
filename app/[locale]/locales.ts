import { headers } from "next/headers"

import { APP_LOCALES } from "./constants"

export type AppLocale = (typeof APP_LOCALES)[number]

export async function getAppLocale(locale?: string | null): Promise<AppLocale> {
  const headersList = await headers();
  const fromHeader = locale || headersList.get("x-locale")

  if (typeof fromHeader !== "string") return "en"
  if (fromHeader.toLowerCase().startsWith("sv")) return "sv"

  return "en"
}

export async function toKlarnaLocale(locale?: string | null): Promise<"sv-SE" | "en-SE"> {
  const headersList = await headers();
  const fromHeader = locale || headersList.get("x-locale")

  if (typeof fromHeader !== "string") return "en-SE"
  if (fromHeader.toLowerCase().startsWith("sv")) return "sv-SE"

  return "en-SE"
}