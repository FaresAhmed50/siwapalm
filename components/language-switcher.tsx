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
          variant={locale === "en" ? "default" : "outline"}
          className={cn(locale === "en" ? "bg-white text-green-700" : "border-white text-white", "flex-1")}
          onClick={() => switchLocale("en")}
        >
          English
        </Button>
        <Button
          variant={locale === "ar" ? "default" : "outline"}
          className={cn(locale === "ar" ? "bg-white text-green-700" : "border-white text-white", "flex-1")}
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
            scrolled ? "text-green-700" : "text-white",
            "font-medium"
          )}
        >
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

