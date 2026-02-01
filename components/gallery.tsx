"use client";
import { useState } from "react";
import { PhotoCard } from "./photo-card";
import { Modal } from "./modal";
import { Photo } from "@/types/photo-types";

interface GalleryProps {
    photos: Photo[];
}

export const Gallery = ({ photos }: GalleryProps) => {
    // State'i [index, direction] olarak tutuyoruz.
    // index: Hangi fotodayız?
    // direction: Hangi yöne gidiyoruz? (1: ileri, -1: geri)
    const [[page, direction], setPage] = useState([0, 0]);
    const [isOpen, setIsOpen] = useState(false);

    // Seçili fotoyu index üzerinden buluyoruz
    const selectedPhoto = isOpen ? photos[page] : null;

    const changePhoto = (newDirection: number) => {
        let newIndex = page + newDirection;

        // Döngüsel yapı (Son fotodan başa, baştan sona)
        if (newIndex < 0) newIndex = photos.length - 1;
        if (newIndex >= photos.length) newIndex = 0;

        // Tuple güncellemesi: React bunu "tek bir işlem" olarak görür
        setPage([newIndex, newDirection]);
    };

    const handlePhotoClick = (photo: Photo) => {
        const index = photos.findIndex((p) => p.id === photo.id);
        setPage([index, 0]); // 0 yönüyle (animasyonsuz veya nötr) aç
        setIsOpen(true);
    };

    return (
        <>
            <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4 p-4">
                {photos.map((photo) => (
                    <PhotoCard
                        key={photo.id}
                        photo={photo}
                        onClick={handlePhotoClick}
                    />
                ))}
            </div>

            {/* Modal her zaman render edilip null kontrolü içeride de yapılabilir 
                ama burada isOpen kontrolü daha temiz */}
            {isOpen && selectedPhoto && (
                <Modal
                    selectedPhoto={selectedPhoto}
                    direction={direction}
                    onClose={() => setIsOpen(false)}
                    onNext={() => changePhoto(1)} // Yön: 1 (Sağ)
                    onPrev={() => changePhoto(-1)} // Yön: -1 (Sol)
                />
            )}
        </>
    );
};