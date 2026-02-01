"use client";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Photo } from "@/types/photo-types";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ModalProps {
    selectedPhoto: Photo; // null olamaz çünkü parent kontrol ediyor
    direction: number;
    onClose: () => void;
    onNext: () => void;
    onPrev: () => void;
}

// Variants: Yön bilgisine göre giriş/çıkış koordinatlarını belirler
const variants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 1000 : -1000, // Sağdaysa +1000, Soldaysa -1000'den gel
        opacity: 0,
        scale: 0.9, // Hafif zoom efekti
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
        scale: 1,
    },
    exit: (direction: number) => ({
        zIndex: 0,
        // KİLİT NOKTA: Çıkarken girişin TERSİNE gitmeli.
        // Eğer sağa (1) gidiyorsak, eski resim sola (-1000) gitmeli.
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
        scale: 0.9, // Çıkarken hafif küçül
    }),
};

export const Modal = ({ selectedPhoto, direction, onClose, onNext, onPrev }: ModalProps) => {

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") onNext();
            if (e.key === "ArrowLeft") onPrev();
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onNext, onPrev, onClose]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
        >
            <button className="absolute top-5 right-5 text-white/70 hover:text-white bg-black/20 hover:bg-white/10 p-2 rounded-full transition z-50">
                <X size={24} />
            </button>

            <button
                onClick={(e) => { e.stopPropagation(); onPrev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-black/20 hover:bg-white/10 p-3 rounded-full transition z-50 hidden md:block"
            >
                <ChevronLeft size={32} />
            </button>

            <button
                onClick={(e) => { e.stopPropagation(); onNext(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-black/20 hover:bg-white/10 p-3 rounded-full transition z-50 hidden md:block"
            >
                <ChevronRight size={32} />
            </button>

            <div
                className="relative w-full h-full max-w-5xl max-h-[85vh] flex items-center justify-center overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* initial={false}: İlk açılışta slide animasyonu yapma.
                  custom={direction}: Bu çok önemli! exit variant'ına yönü bu taşır.
                */}
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                    <motion.div
                        key={selectedPhoto.id}
                        custom={direction} // Variantlara argüman olarak gider
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}

                        // Swipe (Kaydırma) İşlemleri
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={(e, { offset, velocity }) => {
                            const swipe = offset.x;
                            if (swipe < -50) onNext();
                            else if (swipe > 50) onPrev();
                        }}

                        className="absolute w-full h-full flex items-center justify-center"
                    >
                        <Image
                            src={selectedPhoto.src}
                            alt={selectedPhoto.alt}
                            fill
                            className="object-contain"
                            priority
                            sizes="100vw"
                        />
                    </motion.div>
                </AnimatePresence>
            </div>
        </motion.div>
    );
};