import { setRequestLocale } from "next-intl/server"
import HomeClient from "@/components/home-client"
import { locales } from "@/i18n/config"

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  try {
    // Enable static rendering and validate locale
    if (!locales.includes(locale)) {
      throw new Error(`Unsupported locale: ${locale}`)
    }
    
    setRequestLocale(locale)
    return <HomeClient />
  } catch (error) {
    console.error(`Error in HomePage for locale ${locale}:`, error)
    return <div>Error loading page. Please try again later.</div>
  }
}

