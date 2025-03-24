"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useTranslations, useLocale } from "next-intl"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import LanguageSwitcher from "@/components/language-switcher";

type GalleryImage = {
  id: number
  src: string
  alt: string
  category: string
}

export default function GalleryClient() {
  const t = useTranslations("Gallery")
  const locale = useLocale()
  const [activeCategory, setActiveCategory] = useState("all")
  const [scrollY, setScrollY] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Sample gallery images
  const galleryImages: GalleryImage[] = [
    {
      id: 1,
      src: "https://res.cloudinary.com/dduxyvs3x/image/upload/v1741705116/IMG-20250115-WA0158_-_Digital_Marketing_amng6q.jpg",
      alt: "Date palm trees in Siwa Oasis",
      category: "farms"
    },
    {
      id: 2,
      src: "https://res.cloudinary.com/dduxyvs3x/image/upload/v1741704914/IMG-20250304-WA0048_-_Digital_Marketing_fl7ire.jpg",
      alt: "Premium Medjool dates packaging",
      category: "products"
    },
    {
      id: 3,
      src: "https://res.cloudinary.com/dduxyvs3x/image/upload/v1741704908/IMG-20250304-WA0045_-_Digital_Marketing_wvmld6.jpg",
      alt: "Date harvesting process",
      category: "production"
    },
    {
      id: 4,
      src: "https://res.cloudinary.com/dduxyvs3x/image/upload/v1741704912/IMG-20250304-WA0038_-_Digital_Marketing_ttsil5.jpg",
      alt: "Siwa dates on display",
      category: "products"
    },
    {
      id: 5,
      src: "https://res.cloudinary.com/dduxyvs3x/image/upload/v1741705116/IMG-20250115-WA0159_-_Digital_Marketing_wwn1wy.jpg",
      alt: "Aerial view of date palm farm",
      category: "farms"
    },
    {
      id: 6,
      src: "https://res.cloudinary.com/dduxyvs3x/image/upload/v1741705116/IMG-20250115-WA0155_-_Digital_Marketing_jojmgg.jpg",
      alt: "Date sorting and quality control",
      category: "production"
    },
    {
      id: 7,
      src: "https://res.cloudinary.com/dduxyvs3x/image/upload/v1741704910/IMG-20250304-WA0044_-_Digital_Marketing_uhn6fw.jpg",
      alt: "Mazaq dates close-up",
      category: "products"
    },
    {
      id: 8,
      src: "https://res.cloudinary.com/dduxyvs3x/image/upload/v1741705115/IMG-20250115-WA0156_-_Digital_Marketing_pwmjrh.jpg",
      alt: "Irrigation system in date farm",
      category: "farms"
    },
    {
      id: 9,
      src: "https://res.cloudinary.com/dduxyvs3x/image/upload/v1741704908/IMG-20250304-WA0045_-_Digital_Marketing_wvmld6.jpg",
      alt: "Date packaging line",
      category: "production"
    },
  ]

  const filteredImages = activeCategory === "all" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory)

  return (
    <div dir={locale === "ar" ? "rtl" : "ltr"} className="min-h-screen bg-stone-50">



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












      {/* Hero Section */}
      <section className="relative py-20 bg-[#458a5d]">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{t("title")}</h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">{t("subtitle")}</p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <CategoryButton 
              active={activeCategory === "all"} 
              onClick={() => setActiveCategory("all")}
            >
              {t("categories.all")}
            </CategoryButton>
            <CategoryButton 
              active={activeCategory === "farms"} 
              onClick={() => setActiveCategory("farms")}
            >
              {t("categories.farms")}
            </CategoryButton>
            <CategoryButton 
              active={activeCategory === "products"} 
              onClick={() => setActiveCategory("products")}
            >
              {t("categories.products")}
            </CategoryButton>
            <CategoryButton 
              active={activeCategory === "production"} 
              onClick={() => setActiveCategory("production")}
            >
              {t("categories.production")}
            </CategoryButton>
          </div>

          {/* Gallery Grid */}
          {filteredImages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredImages.map((image) => (
                <div key={image.id} className="relative h-80 rounded-xl overflow-hidden group">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#458a5d]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-6 text-white">
                      <h3 className="font-bold text-xl">{image.alt}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 mb-4">{t("noResults")}</p>
              <Button 
                variant="outline" 
                onClick={() => setActiveCategory("all")}
                className="border-[#458a5d] text-[#458a5d] hover:bg-[#458a5d] hover:text-white"
              >
                {t("categories.all")}
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Back to Home */}
      <section className="py-12 text-center">
        <Link href={`/${locale}`}>
          <Button className="bg-[#458a5d] hover:bg-[#3a7650] text-white">
            {locale === "ar" ? <ArrowRight className="mr-2 h-4 w-4" /> : <ArrowLeft className="mr-2 h-4 w-4" />}
            {t("backToHome")}
          </Button>
        </Link>
      </section>
    </div>
  )
}

// Helper component
function CategoryButton({ 
  children, 
  active = false, 
  onClick 
}: { 
  children: React.ReactNode
  active?: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-6 py-3 rounded-full font-medium transition-colors",
        active 
          ? "bg-[#458a5d] text-white" 
          : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
      )}
    >
      {children}
    </button>
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
