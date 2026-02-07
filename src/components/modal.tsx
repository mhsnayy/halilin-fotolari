"use client";
import { useEffect, useCallback } from "react"; // useCallback ekledik
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Photo } from "@/types/photo-types";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ModalProps {
    selectedPhoto: Photo;
    direction: number;
    onClose: () => void;
    onNext: () => void;
    onPrev: () => void;
}

const variants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
        scale: 0.9,
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
        scale: 1,
    },
    exit: (direction: number) => ({
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
        scale: 0.9,
    }),
};

export const Modal = ({ selectedPhoto, direction, onClose, onNext, onPrev }: ModalProps) => {

    const handleManualClose = useCallback(() => {
        if (window.history.state?.modalOpen) {
            window.history.back();
        } else {
            onClose();
        }
    }, [onClose]);

    useEffect(() => {
        window.history.pushState({ modalOpen: true }, "", window.location.href);

        const handlePopState = () => {
            onClose();
        };

        window.addEventListener("popstate", handlePopState);

        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, [onClose]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") onNext();
            if (e.key === "ArrowLeft") onPrev();
            if (e.key === "Escape") handleManualClose();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onNext, onPrev, handleManualClose]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleManualClose}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
        >
            <button
                onClick={(e) => { e.stopPropagation(); handleManualClose(); }}
                className="absolute top-5 right-5 text-white/70 hover:text-white bg-black/20 hover:bg-white/10 p-2 rounded-full transition z-50"
            >
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
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                    <motion.div
                        key={selectedPhoto.id}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={(e, { offset }) => {
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