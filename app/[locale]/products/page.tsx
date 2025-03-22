import { setRequestLocale } from "next-intl/server"
import ProductsClient from "@/components/products-client"
import { locales } from "@/i18n/config"

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default function ProductsPage({ params: { locale } }: { params: { locale: string } }) {
  try {
    // Enable static rendering and validate locale
    if (!locales.includes(locale)) {
      throw new Error(`Unsupported locale: ${locale}`)
    }
    
    setRequestLocale(locale)
    return <ProductsClient />
  } catch (error) {
    console.error(`Error in ProductsPage for locale ${locale}:`, error)
    return <div>Error loading products. Please try again later.</div>
  }
}

