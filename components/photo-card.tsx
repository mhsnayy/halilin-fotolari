"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Photo } from "@/types/photo-types";

interface PhotoCardProps {
    photo: Photo;
    onClick: (photo: Photo) => void;
}

export const PhotoCard = ({ photo, onClick }: PhotoCardProps) => {
    return (
        <motion.div
            layoutId={`photo-${photo.id}`}
            // break-inside-avoid: Masonry layout'ta kartın bölünmesini engeller
            className="relative mb-4 break-inside-avoid group cursor-zoom-in overflow-hidden rounded-xl"
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
                    // width/height SİLDİK (Import ettiğimiz için otomatik algılar)

                    // placeholder="blur" otomatik çalışır çünkü import kullandık
                    placeholder="blur"

                    className="object-cover w-full h-auto transition-transform duration-500 group-hover:scale-110"

                    // Responsive İyileştirme:
                    // Mobilde %100 genişlik, Tablette %50, Masaüstünde %33
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Karartma efekti */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </div>
        </motion.div>
    );
};