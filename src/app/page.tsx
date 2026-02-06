import Link from "next/link";
import { Playfair_Display, Inter } from "next/font/google";
import * as motion from "framer-motion/client"; // Next.js 14/15 Client Component kullanımı için

// 1. Font Tanımlamaları (Zarif bir görünüm için)
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-playfair"
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter"
});

export default function Home() {
  return (
    <main className={`min-h-screen bg-neutral-950 flex flex-col items-center justify-center relative overflow-hidden ${inter.variable} ${playfair.variable}`}>

      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="z-10 text-center px-6">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
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
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
        >
          <Link
            href="/engagement"
            className="group relative w-40 py-3 px-6 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-600 transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 font-medium tracking-wide">Nişan</span>
            <div className="absolute inset-0 bg-neutral-800/50 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </Link>

          <Link
            href="/wedding"
            className="group relative w-40 py-3 px-6 rounded-full bg-white text-black border border-white hover:bg-neutral-200 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          >
            <span className="relative z-10 font-medium tracking-wide">Düğün</span>
          </Link>

        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 text-neutral-600 text-xs font-light tracking-widest"
      >
        Halil & Zeynep 2023 - ∞
      </motion.div>

    </main>
  );
}