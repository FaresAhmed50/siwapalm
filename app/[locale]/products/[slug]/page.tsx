import { setRequestLocale } from "next-intl/server"
import ProductDetailClient from "@/components/product-detail-client"
import { locales } from "@/i18n/config"
import { notFound } from "next/navigation"

export function generateStaticParams() {
  return locales.flatMap((locale) => [
    { locale, slug: "medjool" },
    { locale, slug: "siwa" },
    { locale, slug: "mazaq" },
  ])
}

export default function ProductDetailPage({ params }: { params: { locale: string; slug: string } }) {
  // Validate the locale
  if (!locales.includes(params.locale)) notFound()
  
  // Enable static rendering
  setRequestLocale(params.locale)

  return <ProductDetailClient slug={params.slug} />
}

