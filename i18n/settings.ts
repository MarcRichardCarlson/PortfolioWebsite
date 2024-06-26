import { APP_LOCALES } from "@/app/[locale]/constants"
import { AppLocale } from "@/app/[locale]/locales"


export const defaultNS = "common"

export function getOptions(locale: AppLocale = "en", ns = defaultNS) {
  return {
    supportedLngs: APP_LOCALES,
    fallbackLng: "en",
    lng: locale,
    fallbackNS: defaultNS,
    defaultNS: defaultNS,
    ns,
  }
}
