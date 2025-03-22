"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useTranslations, useLocale } from "next-intl"
import { Phone, Mail, Instagram, Facebook, Twitter, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import LanguageSwitcher from "@/components/language-switcher"

export default function SharedHeader() {
  const t = useTranslations("Home")
  const locale = useLocale()
  const [scrollY, setScrollY] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* النافذة العائمة للتنقل */}
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

          <div className="hidden md:flex items-center gap-6">
            <NavLink active={locale === ""} scrolled={scrollY > 100} href={`/${locale}`}>
              {t("nav.home")}
            </NavLink>
            <NavLink active={locale === "products"} scrolled={scrollY > 100} href={`/${locale}/products`}>
              {t("nav.products")}
            </NavLink>
            <NavLink active={locale === "about"} scrolled={scrollY > 100} href={`/${locale}/about`}>
              {t("nav.about")}
            </NavLink>
            <NavLink active={locale === "contact"} scrolled={scrollY > 100} href={`/${locale}/contact`}>
              {t("nav.contact")}
            </NavLink>
            <NavLink active={locale === "gallery"} scrolled={scrollY > 100} href={`/${locale}/gallery`}>
              {t("nav.gallery")}
            </NavLink>
            <LanguageSwitcher scrolled={scrollY > 100} />
          </div>

          <div className="hidden md:flex items-center gap-4">
            <div className={cn("flex items-center gap-2 transition-colors", scrollY > 100 ? "text-green-900" : "text-white")}>
              <span className="inline-flex items-center">
                <Phone className="h-4 w-4 mr-1" />
                +20 123 456 7890
              </span>
            </div>
            <div className={cn("flex items-center gap-2 transition-colors", scrollY > 100 ? "text-green-900" : "text-white")}>
              <span className="inline-flex items-center">
                <Mail className="h-4 w-4 mr-1" />
                info@siwapalm.com
              </span>
            </div>
            <div className="flex items-center gap-2">
              <a href="https://www.facebook.com/share/16EpBZ9Hir/?mibextid=wwXIfr" target="_blank" className={cn("transition-colors hover:text-green-600", scrollY > 100 ? "text-green-900" : "text-white")}>
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" target="_blank" className={cn("transition-colors hover:text-green-600", scrollY > 100 ? "text-green-900" : "text-white")}>
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" target="_blank" className={cn("transition-colors hover:text-green-600", scrollY > 100 ? "text-green-900" : "text-white")}>
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(true)}>
            <Menu className={scrollY > 100 ? "text-green-900" : "text-white"} />
          </Button>
        </div>
      </div>

      {/* القائمة المتحركة للجوال */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-green-900 z-50 flex flex-col p-6">
          <div className="flex justify-between items-center mb-6">
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

          <div className="flex flex-col gap-6 text-white text-xl">
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
          </div>

          <div className="mt-6 space-y-4">
            <div className="text-white flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>+20 123 456 7890</span>
            </div>
            <div className="text-white flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>info@siwapalm.com</span>
            </div>
            <div className="flex gap-4 mt-4">
              <a href="https://www.facebook.com/share/16EpBZ9Hir/?mibextid=wwXIfr" target="_blank" className="w-10 h-10 rounded-full bg-green-800 flex items-center justify-center text-white hover:bg-green-700">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-green-800 flex items-center justify-center text-white hover:bg-green-700">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-green-800 flex items-center justify-center text-white hover:bg-green-700">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="mt-auto">
            <LanguageSwitcher isMobile={true} />
          </div>
        </div>
      )}
    </>
  )
}

// مكون NavLink المساعد
function NavLink({ children, active = false, scrolled = false, href = "#" }) {
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