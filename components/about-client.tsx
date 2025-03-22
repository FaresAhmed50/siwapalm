"use client"

import { useTranslations } from "next-intl"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { useLocale } from "next-intl"
import SharedHeader from "@/components/ui/shared-header"

export default function AboutClient() {
  const t = useTranslations("Home")
  const locale = useLocale()

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-green-50/20">
      <SharedHeader />
      
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-amber-800/90 -z-10" />
        <div
          className="absolute inset-0 bg-[url('/date-pattern.png')] bg-repeat opacity-10 -z-10"
          style={{ backgroundSize: "200px" }}
        />

        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">{t("about.title")}</h1>
            <p className="text-lg md:text-xl text-white/80 mb-8">{t("about.subtitle")}</p>
          </motion.div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16 container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://res.cloudinary.com/dduxyvs3x/image/upload/v1741704911/IMG-20250304-WA0025_-_Digital_Marketing_vqnpgm.jpg"
                alt="Siwa Palm Farm"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-green-900">{t("about.historyTitle")}</h2>
            <div className="prose prose-lg text-amber-950/80">
              <p>
                Siwa Palm is a leading agricultural company with decades of experience, specializing in growing 
                Medjool and Siwa dates in Siwa Oasis and the Western Desert.
              </p>
              <p>
                Founded in 2001 as an Egyptian joint-stock company, we take quality as our motto 
                in production and export. We have received numerous awards as the best producer 
                of semi-dry Medjool dates, and we strive for global leadership.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Our Mission */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-20 bg-white rounded-2xl p-8 shadow-lg"
        >
          <h2 className="text-3xl font-bold text-green-900 text-center mb-8">{t("about.missionTitle")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-green-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-green-800 mb-4">{t("about.qualityTitle")}</h3>
              <p className="text-amber-800/70">
                We are committed to producing the highest quality dates through sustainable farming practices and rigorous quality control.
              </p>
            </div>
            <div className="bg-amber-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-amber-800 mb-4">{t("about.sustainabilityTitle")}</h3>
              <p className="text-amber-800/70">
                Our farming methods respect the environment and local ecosystems, ensuring sustainability for generations to come.
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-green-800 mb-4">{t("about.communityTitle")}</h3>
              <p className="text-amber-800/70">
                We support local communities by providing employment and investing in rural development projects in Siwa Oasis.
              </p>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  )
} 