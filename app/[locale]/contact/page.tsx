import { setRequestLocale } from "next-intl/server"
import { locales, defaultLocale } from "@/i18n/config"
import { getTranslations } from "next-intl/server"
import ContactClient from "@/components/contact-client"
import { notFound } from "next/navigation"

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const locale = params?.locale || defaultLocale;
  const t = await getTranslations({ locale, namespace: "Home" })
  
  return {
    title: `${t("contact.title")} | Siwa Palm`,
  }
}

export default async function ContactPage({ params }: { params: { locale: string } }) {
  // Validate if the locale exists in our config
  const locale = params.locale;
  if (!locales.includes(locale)) notFound();
  
  // Set the locale for this request
  setRequestLocale(locale);

  return <ContactClient />;
} 