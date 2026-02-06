import { photos } from "@/data/hz/photo-source-path";
import { Hero } from "@/components/hero";
import { Gallery } from "@/components/gallery";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950">
      <div className="max-w-7xl mx-auto">
        <Hero h1="Halil & Zeynep" p="Gururla Sunar" />
        <Gallery photos={photos} />
      </div>
    </main>
  );
}