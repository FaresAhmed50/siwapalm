"use client"

import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useLocale } from "next-intl"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

export default function LanguageSwitcher({ scrolled = false, isMobile = false }) {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const [isOpen, setIsOpen] = useState(false)

  const switchLocale = (newLocale) => {
    // Replace the locale segment in the pathname
    const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`)
    router.push(newPathname)
  }

  if (isMobile) {
    return (
      <div className="flex justify-center gap-4">
          <Button
              variant={locale === "en" ? "outline" : "outline"}
              className={cn(locale === "en" ? "border-white bg-white text-black hover:bg-white/20 text-lg py-6 px-8" : "border-white text-black hover:bg-white/20 text-lg py-6 px-8", "flex-1")}
              onClick={() => switchLocale("en")}
          >

              English
          </Button>
          <Button
              variant={locale === "ar" ? "outline" : "outline"}
              className={cn(locale === "ar" ? "border-white bg-white text-black hover:bg-white/20 text-lg py-6 px-8" : "border-white text-black hover:bg-white/20 text-lg py-6 px-8", "flex-1")}
              onClick={() => switchLocale("ar")}
          >
              العربية
          </Button>
      </div>
    )
  }

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className={cn(
                        scrolled ? "text-green-700" : "text-black",
                        "font-medium border border-black",

                    )}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                         className="lucide lucide-globe">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
                        <path d="M2 12h20"/>
                    </svg>
                    {locale === "ar" ? "English" : "العربية"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
          <DropdownMenuItem
              className={locale === "en" ? "bg-green-50 text-green-700 font-medium" : ""}
              onClick={() => switchLocale("en")}
          >
              English
          </DropdownMenuItem>
          <DropdownMenuItem
              className={locale === "ar" ? "bg-green-50 text-green-700 font-medium" : ""}
              onClick={() => switchLocale("ar")}
          >
              العربية
          </DropdownMenuItem>
      </DropdownMenuContent>
        </DropdownMenu>
    )
}

