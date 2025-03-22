"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronDown, Menu, X, Instagram, Facebook, Twitter } from "lucide-react"
import { useTranslations, useLocale } from "next-intl"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import LanguageSwitcher from "@/components/language-switcher"

export default function HomeClient() {
  const t = useTranslations("Home")
  const locale = useLocale()
  const [scrollY, setScrollY] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeProduct, setActiveProduct] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const products = [
    {
      id: 0,
      name: t("products.medjool.name"),
      description: t("products.medjool.description"),
      image: "https://res.cloudinary.com/dduxyvs3x/image/upload/v1741704914/IMG-20250304-WA0048_-_Digital_Marketing_fl7ire.jpg",
      color: "bg-green-800",
      slug: "medjool",
    },
    {
      id: 1,
      name: t("products.siwa.name"),
      description: t("products.siwa.description"),
      image: "https://res.cloudinary.com/dduxyvs3x/image/upload/v1741704912/IMG-20250304-WA0038_-_Digital_Marketing_ttsil5.jpg",
      color: "bg-green-600",
      slug: "siwa",
    },
    {
      id: 2,
      name: t("products.mazaq.name"),
      description: t("products.mazaq.description"),
      image: "https://res.cloudinary.com/dduxyvs3x/image/upload/v1741704910/IMG-20250304-WA0044_-_Digital_Marketing_uhn6fw.jpg",
      color: "bg-green-700",
      slug: "mazaq",
    },
  ]

  const parallaxOffset = scrollY * 0.5

  return (
    <div dir={locale === "ar" ? "rtl" : "ltr"} className="min-h-screen bg-stone-50 overflow-hidden">
      {/* النافذة العائمة للتنقل */}
      <div
        className={cn(
          "fixed top-6 right-6 left-6 z-50 transition-all duration-500 rounded-2xl shadow-lg backdrop-blur-md",
          scrollY > 100 ? "bg-white/90" : "bg-transparent",
        )}
      >
        <div className="flex items-center justify-between p-4">
          {/* Social media icons and contact info */}
          <div className="flex items-center gap-4">
            <a href="https://www.facebook.com/share/16EpBZ9Hir/?mibextid=wwXIfr" target="_blank" className={cn("transition-colors", scrollY > 100 ? "text-green-900" : "text-white")}>
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" target="_blank" className={cn("transition-colors", scrollY > 100 ? "text-green-900" : "text-white")}>
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" target="_blank" className={cn("transition-colors", scrollY > 100 ? "text-green-900" : "text-white")}>
              <Twitter className="h-5 w-5" />
            </a>
            <span className={cn("hidden md:inline transition-colors", scrollY > 100 ? "text-green-900" : "text-white")}>
              info@siwapalm.com
            </span>
            <span className={cn("hidden md:inline transition-colors", scrollY > 100 ? "text-green-900" : "text-white")}>
              +20 123 456 7890
            </span>
          </div>

          <div className="flex items-center gap-2 order-first">
            <Image
              src="/siwa-palm-logo.png"
              alt={t("logoAlt")}
              width={40}
              height={40}
              className="rounded-full"
            />
            <span
              className={cn("font-bold text-xl transition-colors", scrollY > 100 ? "text-green-900" : "text-white")}
            >
              {locale === "en" ? "Siwa Palm" : "سيوه بالم"}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <NavLink active={true} scrolled={scrollY > 100} href={`/${locale}`}>
              {t("nav.home")}
            </NavLink>
            <NavLink scrolled={scrollY > 100} href={`/${locale}/products`}>
              {t("nav.products")}
            </NavLink>
            <NavLink scrolled={scrollY > 100} href={`/${locale}/about`}>
              {t("nav.about")}
            </NavLink>
            <NavLink scrolled={scrollY > 100} href={`/${locale}/contact`}>
              {t("nav.contact")}
            </NavLink>
            <NavLink scrolled={scrollY > 100} href={`/${locale}/gallery`}>
              {t("nav.gallery")}
            </NavLink>
            <LanguageSwitcher scrolled={scrollY > 100} />
          </div>

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(true)}>
            <Menu className={scrollY > 100 ? "text-green-900" : "text-white"} />
          </Button>
        </div>
      </div>

      {/* القائمة المتحركة للجوال */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-green-900 z-50 flex flex-col p-6">
          <div className="flex justify-between items-center mb-12">
            <div className="flex items-center gap-2">
              <Image
                src="/siwa-palm-logo.png"
                alt={t("logoAlt")}
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="font-bold text-xl text-white">{locale === "en" ? "Siwa Palm" : "سيوه بالم"}</span>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
              <X className="text-white" />
            </Button>
          </div>

          <div className="flex flex-col gap-8 text-white text-2xl">
            <Link href={`/${locale}`} className="border-b border-green-700 pb-4 hover:text-green-200 transition-colors">
              {t("nav.home")}
            </Link>
            <Link href={`/${locale}/products`} className="border-b border-green-700 pb-4 hover:text-green-200 transition-colors">
              {t("nav.products")}
            </Link>
            <Link href={`/${locale}/about`} className="border-b border-green-700 pb-4 hover:text-green-200 transition-colors">
              {t("nav.about")}
            </Link>
            <Link href={`/${locale}/contact`} className="border-b border-green-700 pb-4 hover:text-green-200 transition-colors">
              {t("nav.contact")}
            </Link>
            <Link href={`/${locale}/gallery`} className="border-b border-green-700 pb-4 hover:text-green-200 transition-colors">
              {t("nav.gallery")}
            </Link>
            <LanguageSwitcher isMobile={true} />
          </div>

          <div className="mt-auto">
            <Button className="w-full bg-white text-green-900 hover:bg-green-100">{t("viewProduct")}</Button>
          </div>
        </div>
      )}

      {/* قسم الصفحة الرئيسية */}
      <section className="relative h-screen overflow-hidden">
        {/* خلفية متحركة */}
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: "url('https://res.cloudinary.com/dduxyvs3x/image/upload/v1741704914/IMG-20250304-WA0048_-_Digital_Marketing_fl7ire.jpg')",
            transform: `translateY(${parallaxOffset}px)`,
          }}
        />

        {/* طبقة التعتيم */}
        <div className="absolute inset-0 bg-gradient-to-b from-green-950/70 to-green-900/90 z-10" />

        {/* المحتوى */}
        <div className="relative z-20 container mx-auto h-full flex flex-col justify-center items-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              <span className="block">{t("hero.title1")}</span>
              <span className="text-green-300">{t("hero.title2")}</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8">{t("hero.subtitle")}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${locale}/products`}>
                <Button className="bg-green-600 hover:bg-green-700 text-white text-lg py-6 px-8">
                  {t("hero.browseProducts")}
                </Button>
              </Link>
              <Link href={`/${locale}/about`}>
              <Button variant="outline" className="border-white text-white hover:bg-white/20 text-lg py-6 px-8">
                {t("hero.learnMore")}
              </Button>
              </Link>
            </div>
          </motion.div>

          <div className="absolute bottom-12 left-0 right-0 flex justify-center">
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}>
              <ChevronDown className="text-white w-10 h-10 opacity-70" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* قسم المنتجات */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-green-900/20 to-transparent z-10" />

        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-green-900 mb-4">{t("products.title")}</h2>
            <p className="text-lg text-green-800/70 max-w-2xl mx-auto">{t("products.subtitle")}</p>
          </div>

          {/* عرض المنتجات بطريقة مبتكرة */}
          <div className="relative h-[600px] md:h-[700px] mb-12">
            {/* خلفية متحركة للمنتجات */}
            <div className="absolute inset-0 rounded-3xl bg-green-800" />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_30%,_rgba(0,0,0,0.4)_100%)]" />

            <div className="relative h-full flex flex-col md:flex-row">
              {/* صورة المنتج */}
              <div className="w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center p-8">
                <div className="relative w-full h-full max-w-md">
                  <Image
                    src={products[activeProduct].image || "/placeholder.svg"}
                    alt={products[activeProduct].name}
                    fill
                    className="object-contain drop-shadow-2xl"
                  />
                </div>
              </div>

              {/* تفاصيل المنتج */}
              <div className="w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center p-8">
                <div className="text-white max-w-lg">
                  <p className="text-green-100 text-sm uppercase tracking-wider mb-2">
                    {t("products.featured")}
                  </p>
                  <h3 className="text-3xl md:text-5xl font-bold mb-4">{products[activeProduct].name}</h3>
                  <p className="text-green-100 text-lg md:text-xl mb-6">
                    {products[activeProduct].description}
                  </p>
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-200" />
                      <p>{t("products.feature1")}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-200" />
                      <p>{t("products.feature2")}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-200" />
                      <p>{t("products.feature3")}</p>
                    </div>
                  </div>
                  <button className="bg-white text-green-800 hover:bg-green-100 rounded-full px-8 py-3 font-medium">
                    {t("viewProduct")}
                  </button>
                </div>
              </div>
            </div>

            {/* نقاط التنقل بين المنتجات (جعلناها ثابتة) */}
            <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
              {products.map((product, index) => (
                <div
                  key={index}
                  className={cn("w-3 h-3 rounded-full transition-colors", 
                    index === activeProduct ? "bg-white" : "bg-white/30"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* قسم عن الشركة */}
      <section className="py-20 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/2">
              <div className="relative h-[400px] md:h-[600px] rounded-3xl overflow-hidden">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt={t("about.farmImageAlt")}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/70 to-transparent" />
                <div className="absolute bottom-0 right-0 left-0 p-8">
                  <p className="text-white text-lg font-medium">{t("about.farmLocation")}</p>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2">
              <h2 className="text-3xl md:text-5xl font-bold text-green-900 mb-6">{t("about.title")}</h2>
              <div className="space-y-6 text-lg text-green-800/80">
                <p>{t("about.paragraph1")}</p>
                <p>{t("about.paragraph2")}</p>
                <div className="pt-4 grid grid-cols-2 md:grid-cols-3 gap-6">
                  <ValueCard
                    icon="🌴"
                    title={t("about.values.agriculture.title")}
                    description={t("about.values.agriculture.description")}
                  />
                  <ValueCard
                    icon="⭐"
                    title={t("about.values.quality.title")}
                    description={t("about.values.quality.description")}
                  />
                  <ValueCard
                    icon="🌱"
                    title={t("about.values.sustainability.title")}
                    description={t("about.values.sustainability.description")}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* قسم معرض الصور */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-[#458a5d] mb-4">{t("gallery.title")}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t("gallery.subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Gallery Image 1 */}
            <div className="relative h-80 rounded-xl overflow-hidden group">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Date palm trees in Siwa Oasis"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#458a5d]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-6 text-white">
                  <h3 className="font-bold text-xl">Siwa Oasis Farms</h3>
                </div>
              </div>
            </div>

            {/* Gallery Image 2 */}
            <div className="relative h-80 rounded-xl overflow-hidden group">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Premium Medjool dates packaging"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#458a5d]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-6 text-white">
                  <h3 className="font-bold text-xl">Premium Packaging</h3>
                </div>
              </div>
            </div>

            {/* Gallery Image 3 */}
            <div className="relative h-80 rounded-xl overflow-hidden group">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Date harvesting process"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#458a5d]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-6 text-white">
                  <h3 className="font-bold text-xl">Harvesting Process</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link href={`/${locale}/gallery`}>
              <Button className="bg-[#458a5d] hover:bg-[#3a7650] text-white px-8 py-6 text-lg">
                {t("gallery.viewMore")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* قسم الاتصال */}
      <section className="py-20 bg-green-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">{t("contact.title")}</h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">{t("contact.subtitle")}</p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/20 transition-colors">
              <h3 className="text-2xl font-bold mb-4">{t("contact.info.title")}</h3>
              <div className="space-y-4">
                <p className="flex items-center gap-3">
                  <span className="text-green-300 text-xl">📞</span>
                  <span>+20 123 456 7890</span>
                </p>
                <p className="flex items-center gap-3">
                  <span className="text-green-300 text-xl">✉️</span>
                  <span>info@siwapalm.com</span>
                </p>
                <p className="flex items-center gap-3">
                  <span className="text-green-300 text-xl">📍</span>
                  <span>{t("contact.info.address")}</span>
                </p>
              </div>

              <div className="mt-8">
                <h4 className="text-xl font-medium mb-4">{t("contact.followUs")}</h4>
                <div className="flex gap-4">
                  <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/20">
                    <Facebook className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/20">
                    <Instagram className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/20">
                    <Twitter className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/20 transition-colors">
              <h3 className="text-2xl font-bold mb-4">{t("contact.form.title")}</h3>
              <form className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder={t("contact.form.name")}
                    className="w-full bg-white/10 border border-white/20 rounded-xl p-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder={t("contact.form.email")}
                    className="w-full bg-white/10 border border-white/20 rounded-xl p-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>
                <div>
                  <textarea
                    placeholder={t("contact.form.message")}
                    rows={4}
                    className="w-full bg-white/10 border border-white/20 rounded-xl p-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>
                <Button className="w-full bg-green-500 hover:bg-green-600 text-white">{t("contact.form.send")}</Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* القسم السفلي */}
      <section className="bg-green-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div>
              <h3 className="text-2xl font-bold mb-6">{locale === "en" ? "Siwa Palm" : "سيوه بالم"}</h3>
              <p className="text-green-100 mb-6">{t("footer.about")}</p>
              <div className="flex gap-4">
                <a href="https://www.facebook.com/share/16EpBZ9Hir/?mibextid=wwXIfr" target="_blank" className="w-10 h-10 rounded-full bg-green-800 flex items-center justify-center hover:bg-green-700 transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-green-800 flex items-center justify-center hover:bg-green-700 transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-green-800 flex items-center justify-center hover:bg-green-700 transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6">{t("footer.quickLinks")}</h3>
              <ul className="space-y-4">
                <li>
                  <Link href={`/${locale}`} className="text-green-100 hover:text-white transition-colors">
                {t("nav.home")}
              </Link>
                </li>
                <li>
                  <Link href={`/${locale}/products`} className="text-green-100 hover:text-white transition-colors">
                {t("nav.products")}
              </Link>
                </li>
                <li>
                  <Link href={`/${locale}/about`} className="text-green-100 hover:text-white transition-colors">
                {t("nav.about")}
              </Link>
                </li>
                <li>
                  <Link href={`/${locale}/contact`} className="text-green-100 hover:text-white transition-colors">
                {t("nav.contact")}
              </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6">{t("footer.contactUs")}</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-800 flex items-center justify-center">
                    <span className="text-xl">📍</span>
                  </div>
                  <span className="text-green-100">Siwa Oasis, Egypt</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-800 flex items-center justify-center">
                    <span className="text-xl">📞</span>
                  </div>
                  <span className="text-green-100">+20 123 456 7890</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-800 flex items-center justify-center">
                    <span className="text-xl">✉️</span>
                  </div>
                  <span className="text-green-100">info@siwapalm.com</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6">{t("footer.sendMessage")}</h3>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder={t("footer.name")}
                  className="w-full px-4 py-2 rounded-lg bg-green-800 placeholder-green-200 text-white border border-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <input
                  type="email"
                  placeholder={t("footer.email")}
                  className="w-full px-4 py-2 rounded-lg bg-green-800 placeholder-green-200 text-white border border-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <textarea
                  rows={3}
                  placeholder={t("footer.message")}
                  className="w-full px-4 py-2 rounded-lg bg-green-800 placeholder-green-200 text-white border border-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </form>
            </div>
          </div>

          <div className="border-t border-green-800 mt-16 pt-8 text-center text-green-100">
            <p>© {new Date().getFullYear()} {locale === "en" ? "Siwa Palm" : "سيوه بالم"}. {t("footer.copyright")}</p>
          </div>
        </div>
      </section>
    </div>
  )
}

function NavLink({ children, active = false, scrolled = false, href }) {
  return (
    <Link
      href={href}
      className={cn(
        "font-medium transition-colors",
        active
          ? scrolled
            ? "text-green-900"
            : "text-white"
          : scrolled
          ? "text-green-700 hover:text-green-900"
          : "text-white/80 hover:text-white",
      )}
    >
      {children}
    </Link>
  )
}

function ValueCard({ icon, title, description }: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="bg-green-100/50 rounded-2xl p-4 hover:bg-green-100 transition-colors">
      <div className="text-3xl mb-2">{icon}</div>
      <h3 className="font-bold text-green-900 mb-1">{title}</h3>
      <p className="text-sm text-green-800/70">{description}</p>
    </div>
  )
}

