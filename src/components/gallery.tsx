"use client";
import { useState, useEffect, useCallback } from "react";
import { PhotoCard } from "./photo-card";
import { Modal } from "./modal";
import { Photo } from "@/types/photo-types";

interface GalleryProps {
    photos: Photo[];
}

export const Gallery = ({ photos }: GalleryProps) => {
    // State: [Mevcut Index, Yön (-1 veya 1)]
    const [[page, direction], setPage] = useState([0, 0]);
    const [isOpen, setIsOpen] = useState(false);

    // Seçili fotoyu güvenli bir şekilde al
    const selectedPhoto = isOpen ? photos[page] : null;

    // Fotoğraf Değiştirme Mantığı (Callback ile sarmaladık ki useEffect içinde kullanabilelim)
    const changePhoto = useCallback((newDirection: number) => {
        setPage(([currentPage]) => {
            let newIndex = currentPage + newDirection;

            // Döngüsel Navigasyon (Infinite Loop)
            if (newIndex < 0) newIndex = photos.length - 1;
            if (newIndex >= photos.length) newIndex = 0;

            return [newIndex, newDirection];
        });
    }, [photos.length]);

    const handlePhotoClick = (photo: Photo) => {
        const index = photos.findIndex((p) => p.id === photo.id);
        setPage([index, 0]);
        setIsOpen(true);
    };

    const closeModal = useCallback(() => {
        setIsOpen(false);
    }, []);

    // 1. KLAVYE NAVİGASYONU (Keyboard Listeners)
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") {
                changePhoto(1);
            } else if (e.key === "ArrowLeft") {
                changePhoto(-1);
            } else if (e.key === "Escape") {
                closeModal();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, changePhoto, closeModal]);

    // 2. SCROLL LOCKING (Arka planı kilitleme)
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"; // Scroll'u kapat
        } else {
            document.body.style.overflow = "auto"; // Scroll'u aç
        }

        // Cleanup: Component unmount olursa veya modal kapanırsa scroll'u geri aç
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    return (
        <>
            {/* Masonry Layout: CSS Columns ile basit ve etkili çözüm */}
            <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4 p-4">
                {photos.map((photo) => (
                    <PhotoCard
                        key={photo.id}
                        photo={photo}
                        onClick={handlePhotoClick}
                    />
                ))}
            </div>

            {/* Modal */}
            {isOpen && selectedPhoto && (
                <Modal
                    selectedPhoto={selectedPhoto}
                    direction={direction}
                    onClose={closeModal}
                    onNext={() => changePhoto(1)}
                    onPrev={() => changePhoto(-1)}
                />
            )}
        </>
    );
};