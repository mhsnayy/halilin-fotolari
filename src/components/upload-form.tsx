'use client'

import { upload } from '@vercel/blob/client';
// DÜZELTME: Yazım hatası giderildi (acitons -> src/actions)
import { saveEngagementReferences } from '@/acitons';
import { useState, useRef } from 'react';

interface UploadFormProps {
    onSuccess?: () => void;
}

async function compressImage(file: File): Promise<Blob> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target?.result as string;

            img.onload = () => {
                const MAX_WIDTH = 1920;
                let width = img.width;
                let height = img.height;

                if (width > MAX_WIDTH) {
                    height = Math.round((height * MAX_WIDTH) / width);
                    width = MAX_WIDTH;
                }

                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    reject(new Error('Canvas hatası'));
                    return;
                }

                ctx.drawImage(img, 0, 0, width, height);
                canvas.toBlob((blob) => {
                    if (blob) resolve(blob);
                    else reject(new Error('Sıkıştırma hatası'));
                }, 'image/jpeg', 0.8);
            };
        };
        reader.onerror = (error) => reject(error);
    });
}

export function UploadForm({ onSuccess }: UploadFormProps) {
    const inputFileRef = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [progress, setProgress] = useState<string>('');

    const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);
        setProgress('Görseller optimize ediliyor...');

        const files = Array.from(inputFileRef.current?.files || []);

        if (files.length === 0) {
            setError("Lütfen en az bir dosya seçin.");
            setIsLoading(false);
            return;
        }

        try {
            const uploadPromises = files.map(async (originalFile) => {

                const compressedBlob = await compressImage(originalFile);

                const newFileName = originalFile.name.replace(/\.[^/.]+$/, "") + ".jpg";
                const compressedFile = new File([compressedBlob], newFileName, {
                    type: 'image/jpeg'
                });
                const imgBitmap = await createImageBitmap(compressedFile);
                const uniquePrefix = Math.random().toString(36).substring(2, 10);
                const uniqueFileName = `${uniquePrefix}-${newFileName}`;
                const newBlob = await upload(uniqueFileName, compressedFile, {
                    access: 'public',
                    handleUploadUrl: '/api/upload-engagement',
                });

                return {
                    url: newBlob.url,
                    alt: originalFile.name.split('.')[0],
                    width: imgBitmap.width,
                    height: imgBitmap.height
                };
            });

            setProgress(`${files.length} dosya yükleniyor...`);

            const uploadedPhotosData = await Promise.all(uploadPromises);

            setProgress('Veritabanına kaydediliyor...');

            const result = await saveEngagementReferences(uploadedPhotosData);

            if (result.status === 'error') {
                throw new Error(result.message);
            }

            if (inputFileRef.current) inputFileRef.current.value = '';
            if (onSuccess) onSuccess();

        } catch (e: any) {
            console.error(e);
            setError(e.message || "Bir hata oluştu.");
        } finally {
            setIsLoading(false);
            setProgress('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm text-neutral-400 mb-1">Görselleri Seç</label>
                <div className="relative">
                    <input
                        ref={inputFileRef}
                        name="file"
                        type="file"
                        accept="image/*"
                        multiple
                        required
                        className="block w-full text-sm text-neutral-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-neutral-800 file:text-white hover:file:bg-neutral-700 cursor-pointer"
                    />
                </div>
                <p className="text-xs text-neutral-500 mt-2">
                </p>
            </div>

            {error && (
                <div className="p-3 bg-red-900/50 border border-red-800 text-red-200 text-sm rounded">
                    🚨 {error}
                </div>
            )}

            <div className="pt-2">
                <button
                    disabled={isLoading}
                    type="submit"
                    className="w-full bg-white text-black font-medium py-2 px-4 rounded hover:bg-neutral-200 disabled:opacity-50 transition-colors flex justify-center items-center gap-2"
                >
                    {isLoading ? (
                        <>
                            <span className="animate-spin h-4 w-4 border-2 border-black border-t-transparent rounded-full"></span>
                            {progress}
                        </>
                    ) : (
                        'Seçilenleri Yükle'
                    )}
                </button>
            </div>
        </form>
    );
}