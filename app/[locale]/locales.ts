import { headers } from "next/headers"

import { APP_LOCALES } from "./constants"

export type AppLocale = (typeof APP_LOCALES)[number]

export function getAppLocale(locale?: string | null): AppLocale {
  const fromHeader = locale || headers().get("x-locale")

  if (typeof fromHeader !== "string") return "en"
  if (fromHeader.toLowerCase().startsWith("sv")) return "sv"

  return "en"
}

export function toKlarnaLocale(locale?: string | null): "sv-SE" | "en-SE" {
  const fromHeader = locale || headers().get("x-locale")

  if (typeof fromHeader !== "string") return "en-SE"
  if (fromHeader.toLowerCase().startsWith("sv")) return "sv-SE"

  return "en-SE"
}