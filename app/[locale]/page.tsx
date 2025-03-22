import { setRequestLocale } from "next-intl/server"
import HomeClient from "@/components/home-client"
import { locales, defaultLocale } from "@/i18n/config"

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default function HomePage({
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
      return <HomeClient />;
    }
    
    setRequestLocale(locale);
    return <HomeClient />;
  } catch (error) {
    console.error(`Error in HomePage:`, error);
    // Fallback to default locale
    setRequestLocale(defaultLocale);
    return <HomeClient />;
  }
}

