"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {useLocale, useTranslations} from "next-intl"
import {ArrowLeft, ArrowRight, Facebook, Instagram, Minus, Plus, ShoppingCart, Twitter} from "lucide-react"

import { Button } from "@/components/ui/button"
import OrderForm from "@/components/order-form"
import {locales} from "@/i18n/config";
import {cn} from "@/lib/utils";
import LanguageSwitcher from "@/components/language-switcher";
import Link from "next/link";

export default function ProductDetailClient({ slug }: { slug: string }) {
  const t = useTranslations("ProductDetail")
  const router = useRouter()
  const locale = useLocale()
  const [scrollY, setScrollY] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [showOrderForm, setShowOrderForm] = useState(false)

  // Get product data based on slug
  const getProductData = () => {
    switch (slug) {
      case "medjool":
        return {
          name: t("medjool.name"),
          description: t("medjool.description"),
          longDescription: t("medjool.longDescription"),
          image: "https://res.cloudinary.com/dduxyvs3x/image/upload/v1741704914/IMG-20250304-WA0048_-_Digital_Marketing_fl7ire.jpg",
          color: "from-green-800 to-green-600",
          price: "120",
          unit: t("unit"),
        }
      case "siwa":
        return {
          name: t("siwa.name"),
          description: t("siwa.description"),
          longDescription: t("siwa.longDescription"),
          image: "https://res.cloudinary.com/dduxyvs3x/image/upload/v1741704912/IMG-20250304-WA0038_-_Digital_Marketing_ttsil5.jpg",
          color: "from-green-700 to-green-500",
          price: "90",
          unit: t("unit"),
        }
      case "mazaq":
        return {
          name: t("mazaq.name"),
          description: t("mazaq.description"),
          longDescription: t("mazaq.longDescription"),
          image: "https://res.cloudinary.com/dduxyvs3x/image/upload/v1741704910/IMG-20250304-WA0044_-_Digital_Marketing_uhn6fw.jpg",
          color: "from-green-800 to-green-600",
          price: "100",
          unit: t("unit"),
        }
      default:
        router.push("/products")
        return null
    }
  }

  const product = getProductData()

  if (!product) return null

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1)
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-stone-50 to-green-50/30 pt-16">
      {/* Back Button */}

      <div
          className={cn(
              "fixed top-6 right-6 left-6 z-50 transition-all duration-500 rounded-2xl shadow-lg backdrop-blur-md",
              scrollY > 100 ? "bg-white/90" : "bg-transparent",
          )}
      >
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
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

          <div className="hidden md:flex items-center gap-8  ">
            <NavLink active={true} scrolled={scrollY > 100} href={`/${locale}`}>
              {t("nav.home")}
            </NavLink>
            <NavLink  scrolled={scrollY > 100} href={`/${locale}/products`}>
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

          <Button className={`${scrollY > 100 ? "text-green-900" : "text-black"} hover:text-black md:hidden` } variant="ghost" size="icon"  onClick={() => setMobileMenuOpen(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                 className="lucide lucide-menu">
              <line x1="4" x2="20" y1="12" y2="12"/>
              <line x1="4" x2="20" y1="6" y2="6"/>
              <line x1="4" x2="20" y1="18" y2="18"/>
            </svg>
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
              <Button className="text-white  hover:text-black hover:scale-110 transition-all duration-300"
                      variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                     className="lucide lucide-x">
                  <path d="M18 6 6 18"/>
                  <path d="m6 6 12 12"/>
                </svg>
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
              <Button className="w-full border border-white bg-white  text-black  hover:bg-white/20 text-lg py-6 px-8 ">{t("viewProduct")}</Button>
            </div>
          </div>
      )}


      <div className="container mx-auto px-4 pt-24">
        <Button
          variant="ghost"
          className="text-green-800 hover:text-green-900 hover:bg-green-50 "
          onClick={() => router.push("/products")}
        >
          {locale === "en" ? (
              <ArrowLeft className="mr-2 h-4 w-4" />
          ) : (
              <ArrowRight className="mr-2 h-4 w-4" />
          )}
          {t("backToProducts")}
        </Button>
      </div>

      {/* Product Details */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2"
          >
            <div
              className={`rounded-3xl overflow-hidden shadow-xl  ${product.color} p-8 h-[400px] md:h-[500px] relative`}
            >
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-contain mix-blend-multiply"
              />
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2"
          >
            <h1 className={`text-3xl md:text-5xl font-bold text-green-800 mb-4 ${locale == "en" ? "text-center md:text-left" : "text-center md:text-right"} `}>{product.name}</h1>
            <p className={`text-xl text-green-800/70 mb-6 ${locale == "en" ? "text-center md:text-left" : "text-center md:text-right"}`}>{product.description}</p>

            <div className="bg-white/70  rounded-2xl p-6 mb-8 shadow-md">
              <p className={`text-lg text-green-800/90 mb-6 ${locale == "en" ? "text-center md:text-left" : "text-center md:text-right"}`}>{product.longDescription}</p>

              <div className="flex items-center justify-between mb-6">
                <div className="text-3xl font-bold text-green-800">
                  ${product.price} <span className="text-lg font-normal text-green-800/70">/ {product.unit}</span>
                </div>

                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    className={` border-green-800 text-green-800 hover:bg-green-50 ${locale == "en" ? "rounded-l-full" : "rounded-r-full"}`}
                    onClick={decreaseQuantity}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>

                  <div className="w-16 text-center font-bold text-green-800">{quantity}</div>

                  <Button
                    variant="outline"
                    size="icon"
                    className={` border-green-800 text-green-800 hover:bg-green-50 ${locale == "en" ? "rounded-r-full" : "rounded-l-full"}`}
                    onClick={increaseQuantity}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>

                </div>
              </div>

              <Button
                className="w-full bg-gradient-to-r from-green-700 to-green-600 hover:from-green-800 hover:to-green-700 text-white text-lg py-6"
                onClick={() => setShowOrderForm(true)}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {t("orderNow")}
              </Button>
            </div>

            {/* Nutritional Info */}
            <div className={`bg-white/70  rounded-2xl p-6 shadow-md ${locale == "en" ? "text-center md:text-left" : "text-center md:text-right"}` }>
              <h3 className="text-xl font-bold text-green-800 mb-4">{t("nutritionalInfo")}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="text-sm text-green-800/70">{t("calories")}</div>
                  <div className="text-lg font-bold text-green-800">277 kcal</div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="text-sm text-green-800/70">{t("protein")}</div>
                  <div className="text-lg font-bold text-green-800">1.8g</div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="text-sm text-green-800/70">{t("carbs")}</div>
                  <div className="text-lg font-bold text-green-800">75g</div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="text-sm text-green-800/70">{t("fiber")}</div>
                  <div className="text-lg font-bold text-green-800">6.7g</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>


      <section className="py-20 bg-green-900 text-white">
        <div className="container mx-auto px-4">

          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">{t("contact.title")}</h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">{t("contact.subtitle")}</p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className={`bg-white/10 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/20 transition-colors  ${locale == "en" ? "text-center md:text-left" : "text-center md:text-right"}` }>
              <h3 className="text-2xl font-bold mb-4 pb-5">{t("contact.info.title")}</h3>
              <div className={`space-y-4 `}>
                <p className={`flex items-center gap-3 ${locale == "en" ? "justify-center  md:justify-start" : "justify-center md:justify-start"}`}>
                  <span className="text-green-300 text-xl">📞</span>
                  <span>+20 123 456 7890</span>
                </p>
                <p className={`flex items-center gap-3 ${locale == "en" ? "justify-center  md:justify-start" : "justify-center md:justify-start"}`}>
                  <span className="text-green-300 text-xl">✉️</span>
                  <span>info@siwapalm.com</span>
                </p>
                <p className={`flex items-center gap-3 ${locale == "en" ? "justify-center  md:justify-start" : "justify-center md:justify-start"}`}>
                  <span className="text-green-300 text-xl">📍</span>
                  <span>{t("contact.info.address")}</span>
                </p>
              </div>

              <div className="mt-8 ">
                <h4 className="text-[24px] font-bold mb-4">{t("contact.followUs")}</h4>
                <div className={`flex gap-4 ${locale == "en" ? "justify-center  md:justify-start" : "justify-center md:justify-start"} ` }>
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
              <h3 className={`text-2xl font-bold mb-4 ${locale == "en" ? "text-center md:text-left" : "text-center md:text-right"} `}>{t("contact.form.title")}</h3>
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
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-10 ">

            <div className="text-center md:text-left">
              <h3 className={`text-2xl font-bold mb-6   ${locale == "en" ? "text-center md:text-left" : "text-center md:text-right"} `}>{locale === "en" ? "Siwa Palm" : "سيوه بالم"}</h3>
              <p className={`text-green-100 mb-6 w-full md:w-[70%] ${locale == 'en' ? "text-center md:text-left" : "text-center md:text-right"} `}>{t("footer.about")}</p>
              <div className="flex gap-4 justify-center md:justify-start">
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

            <div className={` text-center  ${locale == "en" ? "text-center" : "text-center"} ${locale == "en" ? "md:text-left" : "md:text-right"}` }>
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

            <div className={`text-center  ${locale == "en" ? "text-left" : "text-right"}  `}>
              <h3 className={`text-2xl font-bold mb-6 ${locale == "en" ? "text-center md:text-left" : "text-center md:text-right"}`}>{t("footer.contactUs")}</h3>
              <div className="flex justify-center md:justify-start">
                <ul className="space-y-4 ">
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
            </div>
          </div>

          <div className="border-t border-green-800 mt-16 pt-8 text-center text-green-100">
            <p>© {new Date().getFullYear()} {locale === "en" ? "Siwa Palm" : "سيوه بالم"}. {t("footer.copyright")}</p>
          </div>
        </div>
      </section>

      {/* Order Form Modal */}
      {showOrderForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          >
            <h2 className="text-2xl font-bold text-green-800 mb-6">{t("orderForm.title")}</h2>
            <OrderForm productName={product.name} quantity={quantity} onClose={() => setShowOrderForm(false)} />
          </motion.div>
        </div>
      )}
    </div>


  )
}

// @ts-ignore
function NavLink({ children, active = false, scrolled = false, href }) {
  return (
      <Link
          href={href}
          className={cn(
              "font-medium transition-colors hover:text-[#ad0014]",
              active
                  ? scrolled
                      ? "text-green-900"
                      : "text-black"
                  : scrolled
                      ? "text-green-700 hover:text-[#ad0014]"
                      : "text-black/80 hover:text-[#ad0014]",
          )}
      >
        {children}
      </Link>
  )
}
