import { sql } from '@vercel/postgres';
import { Hero } from "@/components/hero";
import { Gallery } from "@/components/gallery";
import { UploadModal } from "@/components/upload-modal";

interface GalleryPhoto {
    id: number;
    src: string;
    alt: string;
    width: number;
    height: number;
}

export default async function Home() {
    const { rows } = await sql`SELECT * FROM photos ORDER BY id DESC`;

    // GÜNCELLEME BURADA:
    const mappedPhotos: GalleryPhoto[] = rows.map((row) => ({
        id: row.id,
        src: row.url,
        alt: row.alt || 'Galeri Görseli',
        // Eğer DB'den null gelirse veya veri yoksa 800 ve 600 değerlerini zorla.
        // Backend refleksinle: "Trust no one, validate everything."
        width: row.width ?? 800,
        height: row.height ?? 600,
    }));

    return (
        <main className="min-h-screen bg-neutral-950">
            <div className="max-w-7xl mx-auto pb-10">
                {/* Header / Upload Kısmı */}
                <div className="flex justify-end p-6 sticky top-0 z-40 bg-gradient-to-b from-neutral-950 to-transparent pointer-events-none">
                    <div className="pointer-events-auto">
                        <UploadModal />
                    </div>
                </div>

                <div className="space-y-8 px-4">
                    <Hero h1="Halil & Zeynep" p="Nişan Albümü" />
                    <Gallery photos={mappedPhotos} />
                </div>
            </div>
        </main>
    );
}