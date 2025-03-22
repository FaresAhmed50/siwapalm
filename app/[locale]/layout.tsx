import "./globals.css"
import { Inter, Amiri } from "next/font/google"
import { notFound } from "next/navigation"
import { NextIntlClientProvider } from "next-intl"
import { ThemeProvider } from "@/components/theme-provider"
import { locales, defaultLocale } from "@/i18n/config"

const inter = Inter({
  subsets: ["latin"], // Removed 'arabic' as it's not supported
  variable: "--font-inter",
})

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
})

export const metadata = {
  title: "Siwa Palm - Premium Dates from Siwa Oasis",
  description: "Leading company in growing and producing the finest dates since 2001",
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Validate the locale first
  const locale = params?.locale || defaultLocale;
  
  // Check if the locale is supported
  if (!locales.includes(locale)) {
    notFound();
  }
  
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    console.error(`Error loading messages for locale: ${locale}`, error);
    try {
      // Fallback to default locale
      messages = (await import(`../../messages/${defaultLocale}.json`)).default;
    } catch (fallbackError) {
      console.error("Could not load messages for default locale either", fallbackError);
      notFound();
    }
  }

  // Set the direction based on locale
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body className={`${inter.variable} ${amiri.variable} font-sans`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="light">
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

