"use client"

import { AppLocale } from "@/app/[locale]/locales"
import { useAppContext } from "@/app/[locale]/providers"


export function useCurrentLocale(): AppLocale {
  const { locale } = useAppContext()
  return locale
}
