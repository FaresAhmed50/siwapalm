import { getRequestConfig } from "next-intl/server"
import { defaultLocale, locales } from "./config"

export default getRequestConfig(async ({ locale }) => {
  // If locale is undefined or not in the supported locales, use the default locale
  const safeLocale = !locale || !locales.includes(locale) ? defaultLocale : locale
  
  try {
    return {
      messages: (await import(`../messages/${safeLocale}.json`)).default,
      locale: safeLocale
    }
  } catch (error) {
    console.error(`Error loading messages for locale: ${safeLocale}`, error)
    // Fallback to default locale if the requested locale's messages can't be loaded
    return {
      messages: (await import(`../messages/${defaultLocale}.json`)).default,
      locale: defaultLocale
    }
  }
})

