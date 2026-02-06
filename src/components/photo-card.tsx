"use client";
import Image from "next/image";
import { motion } from "framer-motion";
// Photo tipinin width ve height içerdiğinden emin olmalıyız
import { Photo } from "@/types/photo-types";

interface PhotoCardProps {
    photo: Photo;
    onClick: (photo: Photo) => void;
}

export const PhotoCard = ({ photo, onClick }: PhotoCardProps) => {
    return (
        <motion.div
            layoutId={`photo-${photo.id}`}
            // break-inside-avoid: Masonry layout yapısında kartın parçalanmasını engeller
            className="relative mb-4 break-inside-avoid group cursor-zoom-in overflow-hidden rounded-xl bg-neutral-900"
            onClick={() => onClick(photo)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            <div className="relative w-full h-auto">
                <Image
                    src={photo.src}
                    alt={photo.alt}

                    // 1. KRİTİK DÜZELTME: Remote URL kullandığımız için Width ve Height ARTIK ZORUNLU.
                    // Veritabanından gelen veriyi buraya bağlıyoruz.
                    width={photo.width}
                    height={photo.height}

                    // 2. DÜZELTME: placeholder="blur" remote image'larda 'blurDataURL' olmadan çalışmaz.
                    // Şimdilik kaldırıyoruz, yoksa hata alırsın.
                    // placeholder="blur" 

                    className="object-cover w-full h-auto transition-transform duration-500 group-hover:scale-110"

                    // Responsive ayarları (Performans için önemli)
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Karartma efekti */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </div>
        </motion.div>
    );
};