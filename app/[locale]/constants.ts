export const APP_LOCALES = ["en", "sv"] as const
export const withLocaleUriPattern = new RegExp(`^\/(${APP_LOCALES.join("|")})(\/.+)?`)