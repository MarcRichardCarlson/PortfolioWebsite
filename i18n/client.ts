import { useEffect, useState } from "react"

import i18next from "i18next"
import resourcesToBackend from "i18next-resources-to-backend"
import { initReactI18next, useTranslation as useTranslationOrg } from "react-i18next"



import { getOptions } from "./settings"
import { APP_LOCALES, withLocaleUriPattern } from "@/app/[locale]/constants"
import { AppLocale } from "@/app/[locale]/locales"

// determine current locale
let isServer = typeof window === "undefined"
let currentLocale = undefined
if (!isServer) {
  let matches = withLocaleUriPattern.exec(window.location.pathname)
  if (matches) currentLocale = matches[1] as AppLocale
}

// initialize if not already initialized
i18next
  .use(initReactI18next)
  .use(resourcesToBackend((lang: string, ns: string) => import(`./locales/${lang}/${ns}.json`)))
  .init({ ...getOptions(), lng: currentLocale, preload: isServer ? APP_LOCALES : [] })

export function useTranslation(locale: AppLocale, ns?: string, options?: { keyPrefix?: string }) {
  const ret = useTranslationOrg(ns, options)
  const { i18n } = ret

  if (isServer) {
    if (locale && i18n.resolvedLanguage !== locale) i18n.changeLanguage(locale)
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [activeLng, setActiveLng] = useState(i18n.resolvedLanguage)

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (activeLng === i18n.resolvedLanguage) return
      setActiveLng(i18n.resolvedLanguage)
    }, [activeLng, i18n.resolvedLanguage])

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (!locale || i18n.resolvedLanguage === locale) return
      i18n.changeLanguage(locale)
    }, [locale, i18n])
  }

  return ret
}
