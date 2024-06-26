import { createInstance } from "i18next"
import resourcesToBackend from "i18next-resources-to-backend"
import { initReactI18next } from "react-i18next/initReactI18next"

import { getOptions } from "./settings"
import { AppLocale } from "@/app/[locale]/locales"

const initI18nNext = async (lng: AppLocale, ns?: string) => {
  const instance = createInstance()
  await instance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (locale: string, namespace: string) => import(`./locales/${locale}/${namespace}.json`),
      ),
    )
    .init(getOptions(lng, ns))

  return instance
}

export async function getTranslation(
  locale: AppLocale,
  ns: string,
  options?: { keyPrefix?: string },
) {
  const instance = await initI18nNext(locale, ns)

  return {
    t: instance.getFixedT(locale, ns, options?.keyPrefix),
    i18n: instance,
  }
}
