import { getRequestConfig } from 'next-intl/server'

const locales = ['en', 'ar'] as const
export type Locale = (typeof locales)[number]

export default getRequestConfig(async ({ locale }) => {
  // Fallback to 'en' if no locale is provided (e.g., root path)
  const resolvedLocale = locale && locales.includes(locale as Locale) ? locale : 'en'

  return {
    locale: resolvedLocale,
    messages: (await import(`../messages/${resolvedLocale}.json`)).default,
  }
})