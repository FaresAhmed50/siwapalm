import { setRequestLocale } from "next-intl/server"
import HomeClient from "@/components/home-client"
import { locales } from "@/i18n/config"
import { notFound } from "next/navigation"

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default function HomePage({
  params,
}: {
  params: { locale: string };
}) {
  // Validate if the locale exists in our config
  const locale = params.locale;
  if (!locales.includes(locale)) notFound();
  
  // Set the locale for this request
  setRequestLocale(locale);
  
  return <HomeClient />;
}

