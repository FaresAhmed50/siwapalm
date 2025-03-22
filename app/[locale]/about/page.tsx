import { setRequestLocale } from "next-intl/server"
import { locales } from "@/i18n/config"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { getTranslations } from "next-intl/server"

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: "Home" })
  
  return {
    title: `${t("about.title")} | Siwa Palm`,
  }
}

export default function AboutPage({ params: { locale } }: { params: { locale: string } }) {
  try {
    // Enable static rendering and validate locale
    if (!locales.includes(locale)) {
      throw new Error(`Unsupported locale: ${locale}`)
    }
    
    setRequestLocale(locale)
    
    return (
      <div className="min-h-screen bg-stone-50 py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-green-900 mb-8 text-center">
            About Siwa Palm
          </h1>
          
          <div className="prose prose-lg mx-auto">
            <p>
              Siwa Palm is a leading agricultural company with decades of experience, specializing in growing 
              Medjool and Siwa dates in Siwa Oasis and the Western Desert.
            </p>
            <p>
              Founded in 2001 as an Egyptian joint-stock company, we take quality as our motto 
              in production and export. We have received numerous awards as the best producer 
              of semi-dry Medjool dates, and we strive for global leadership.
            </p>
            
            <div className="my-8 text-center">
              <Link href={`/${locale}`} className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error(`Error in AboutPage for locale ${locale}:`, error)
    return <div>Error loading about page. Please try again later.</div>
  }
} 