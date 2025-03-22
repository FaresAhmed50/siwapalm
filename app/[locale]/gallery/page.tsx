import { setRequestLocale } from "next-intl/server"
import GalleryClient from "@/components/gallery-client"
import { locales } from "@/i18n/config"

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default function GalleryPage({ params: { locale } }: { params: { locale: string } }) {
  try {
    // Enable static rendering and validate locale
    if (!locales.includes(locale)) {
      throw new Error(`Unsupported locale: ${locale}`)
    }
    
    setRequestLocale(locale)
    return <GalleryClient />
  } catch (error) {
    console.error(`Error in GalleryPage for locale ${locale}:`, error)
    return <div>Error loading gallery. Please try again later.</div>
  }
} 