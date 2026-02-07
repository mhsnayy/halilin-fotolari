import { Playfair_Display, Inter } from "next/font/google";
import { HomeContent } from "@/components/home-component";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-playfair",
  display: "swap",
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
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_0%,rgba(88,28,135,0.25)_0%,transparent_50%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_100%,rgba(30,58,138,0.25)_0%,transparent_50%)]" />
      </div>

      <HomeContent />

    </main>
  );
}