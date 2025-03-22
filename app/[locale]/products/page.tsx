import { setRequestLocale } from "next-intl/server"
import ProductsClient from "@/components/products-client"
import { locales, defaultLocale } from "@/i18n/config"

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default function ProductsPage({
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
      return <ProductsClient />;
    }
    
    setRequestLocale(locale);
    return <ProductsClient />;
  } catch (error) {
    console.error(`Error in ProductsPage:`, error);
    // Fallback to default locale
    setRequestLocale(defaultLocale);
    return <ProductsClient />;
  }
}

