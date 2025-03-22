import { setRequestLocale } from "next-intl/server"
import { locales, defaultLocale } from "@/i18n/config"
import Link from "next/link"
import { getTranslations } from "next-intl/server"

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }) {
  const locale = params?.locale || defaultLocale;
  const t = await getTranslations({ locale, namespace: "Home" })
  
  return {
    title: `${t("contact.title")} | Siwa Palm`,
  }
}

export default function ContactPage({
  params,
}: {
  params: { locale: string };
}) {
  try {
    // Use a fallback if locale is undefined
    const locale = params?.locale || defaultLocale;
    
    // Enable static rendering and validate locale
    if (!locales.includes(locale)) {
      // Just use default locale instead of throwing
      setRequestLocale(defaultLocale);
    } else {
      setRequestLocale(locale);
    }
    
    return (
      <div className="min-h-screen bg-stone-50 py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-green-900 mb-8 text-center">
            Contact Siwa Palm
          </h1>
          
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold text-green-800 mb-4">Contact Information</h2>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-xl">📍</span>
                    </div>
                    <span>Siwa Oasis, Egypt</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-xl">📞</span>
                    </div>
                    <span>+20 123 456 7890</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-xl">✉️</span>
                    </div>
                    <span>info@siwapalm.com</span>
                  </li>
                </ul>
                
                <div className="mt-8">
                  <h3 className="font-bold mb-2">Follow Us</h3>
                  <div className="flex gap-4">
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
                <h2 className="text-2xl font-bold text-green-800 mb-4">Send a Message</h2>
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
      </div>
    )
  } catch (error) {
    console.error(`Error in ContactPage:`, error);
    // Fallback to default locale
    setRequestLocale(defaultLocale);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Error loading contact page</h1>
          <Link href={`/${defaultLocale}`} className="text-blue-500 hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }
} 