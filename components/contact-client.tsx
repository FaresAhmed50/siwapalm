"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useTranslations, useLocale } from "next-intl"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import LanguageSwitcher from "@/components/language-switcher"
import {Facebook, Instagram, Twitter} from "lucide-react";

export default function ContactClient(){

    const t = useTranslations("Home")
    const locale = useLocale()
    const [scrollY, setScrollY] = useState(0)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <div className="min-h-screen bg-stone-50 pt-28 ">
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

            <div className="container mx-auto px-4 pt-24 pb-32">
                <h1 className="text-4xl md:text-6xl font-bold text-green-900 mb-8 text-center">
                    Contact Siwa Palm
                </h1>

                <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h2 className={`text-2xl font-bold text-green-800 mb-4 ${locale == "en" ? "text-center md:text-left" : "text-center md:text-right"}`}>Contact Information</h2>
                            <ul className="space-y-4">
                                <li className={`flex items-center gap-3 ${locale == "en" ? "justify-center md:justify-start" : "justify-center md:justify-start"}` }>
                                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                        <span className="text-xl">📍</span>
                                    </div>
                                    <span>Siwa Oasis, Egypt</span>
                                </li>
                                <li  className={`flex items-center gap-3 ${locale == "en" ? "justify-center md:justify-start" : "justify-center md:justify-start"}` }>
                                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                        <span className="text-xl">📞</span>
                                    </div>
                                    <span>+20 123 456 7890</span>
                                </li>
                                <li  className={`flex items-center gap-3 ${locale == "en" ? "justify-center md:justify-start" : "justify-center md:justify-start"}` }>
                                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                        <span className="text-xl">✉️</span>
                                    </div>
                                    <span>info@siwapalm.com</span>
                                </li>
                            </ul>

                            <div className={`mt-8 ${locale == "en" ? "text-center md:text-left" : "text-center md:text-right"} ` }>
                                <h3 className="font-bold mb-2">Follow Us</h3>
                                <div className={`flex gap-4  ${locale == "en" ? "justify-center md:justify-start" : "justify-center md:justify-start"} pb-5`}>
                                    <a href="https://www.facebook.com/share/16EpBZ9Hir/?mibextid=wwXIfr" target="_blank" className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white">
                                        FB
                                    </a>
                                    <a href="#" className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white">
                                        IG
                                    </a>
                                    <a href="#" className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white">
                                        X
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 className={`text-2xl font-bold text-green-800 mb-4 ${locale == "en" ? "text-center md:text-left" : "text-center md:text-right"} pb-5 `}>Send a Message</h2>
                            <form className="space-y-4">
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Your Name"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="email"
                                        placeholder="Your Email"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                    />
                                </div>
                                <div>
                    <textarea
                        rows={4}
                        placeholder="Your Message"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                                </div>
                                <button type="button" className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg">
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="mt-8 text-center">
                        <Link href={`/${locale}`} className="text-green-600 hover:text-green-800">
                            Back to Home
                        </Link>
                    </div>
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




