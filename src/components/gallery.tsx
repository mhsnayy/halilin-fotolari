"use client";
import { useState, useEffect, useCallback } from "react";
import { PhotoCard } from "./photo-card";
import { Modal } from "./modal";
import { Photo } from "@/types/photo-types";

interface GalleryProps {
    photos: Photo[];
}

export const Gallery = ({ photos }: GalleryProps) => {
    const [[page, direction], setPage] = useState([0, 0]);
    const [isOpen, setIsOpen] = useState(false);

    const selectedPhoto = isOpen ? photos[page] : null;

    const changePhoto = useCallback((newDirection: number) => {
        setPage(([currentPage]) => {
            let newIndex = currentPage + newDirection;

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

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

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