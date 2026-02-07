"use client"; // 1. Next.js'e bunun tarayıcıda çalışacağını söylüyoruz

import Link from "next/link";
import { Playfair_Display, Inter } from "next/font/google";
import { motion } from "framer-motion"; // 2. Standart ve kararlı import

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-playfair",
  display: "swap", // Tarayıcı fontu yükleyene kadar varsayılanı gösterir (Hızı artırır)
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
  display: "swap",
});

export default function Home() {
  return (
    <main
      className={`min-h-screen bg-neutral-950 flex flex-col items-center justify-center relative overflow-hidden ${inter.variable} ${playfair.variable}`}
    >
      {/* 3. OPTİMİZE EDİLMİŞ ARKA PLAN 
        Safari'yi kilitleyen 'blur' divleri yerine, GPU dostu 'radial-gradient' kullanıyoruz.
        Görüntü aynı, performans maliyeti sıfır.
      */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {/* Sol Üst - Mor Işık */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_0%,rgba(88,28,135,0.25)_0%,transparent_50%)]" />
        {/* Sağ Alt - Mavi Işık */}
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_100%,rgba(30,58,138,0.25)_0%,transparent_50%)]" />
      </div>

      <div className="z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }} // Y eksenini 30'dan 20'ye çektim (daha az pixel hesaplaması)
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }} // Süreyi biraz kıstım, daha atik hissettirir
          className="space-y-6"
        >
          <h1 className="text-5xl md:text-7xl font-playfair text-white leading-tight">
            Halil <span className="text-neutral-500 italic">&</span> Zeynep
          </h1>
          <p className="text-neutral-400 text-sm uppercase tracking-[0.3em] font-light">
            Dijital Albüm
          </p>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-neutral-700 to-transparent mx-auto my-8" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }} // Delay ve süreyi optimize ettim
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
        >
          <Link
            href="/engagement"
            className="group relative w-40 py-3 px-6 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-600 transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 font-medium tracking-wide">
              Nişan
            </span>
            <div className="absolute inset-0 bg-neutral-800/50 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </Link>

          <Link
            href="/wedding"
            className="group relative w-40 py-3 px-6 rounded-full bg-white text-black border border-white hover:bg-neutral-200 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          >
            <span className="relative z-10 font-medium tracking-wide">
              Düğün
            </span>
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 text-neutral-600 text-xs font-light tracking-widest"
      >
        Halil & Zeynep 2023 - ∞
      </motion.div>
    </main>
  );
}