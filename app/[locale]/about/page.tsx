import { setRequestLocale } from "next-intl/server"
import { locales } from "@/i18n/config"
import { getTranslations } from "next-intl/server"
import AboutClient from "@/components/about-client"
import { notFound } from "next/navigation"

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const locale = params.locale;
  
  // Validate if the locale exists in our config
  if (!locales.includes(locale)) notFound();
  
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
  // Validate if the locale exists in our config
  const locale = params.locale;
  if (!locales.includes(locale)) notFound();
  
  // Set the locale for this request
  setRequestLocale(locale);
  
  return <AboutClient />;
} 