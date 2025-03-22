import { setRequestLocale } from "next-intl/server"
import { locales, defaultLocale } from "@/i18n/config"
import Link from "next/link"
import { getTranslations } from "next-intl/server"
import AboutClient from "@/components/about-client"

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }) {
  const locale = params?.locale || defaultLocale;
  const t = await getTranslations({ locale, namespace: "Home" })
  
  return {
    title: `${t("about.title")} | Siwa Palm`,
  }
}

export default function AboutPage({
  params,
}: {
  params: { locale: string };
}) {
  try {
    // Use a fallback if locale is undefined
    const locale = params?.locale || defaultLocale;
    
    // Enable static rendering and validate locale
    if (!locales.includes(locale)) {
      // Just use default locale instead of throwing
      setRequestLocale(defaultLocale);
      return <AboutClient />;
    } 
    
    setRequestLocale(locale);
    return <AboutClient />;
  } catch (error) {
    console.error(`Error in AboutPage:`, error);
    // Fallback to default locale
    setRequestLocale(defaultLocale);
    return <AboutClient />;
  }
} 