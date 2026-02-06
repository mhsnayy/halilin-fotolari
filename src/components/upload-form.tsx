'use client'

import { upload } from '@vercel/blob/client';
import { savePhotoReferences } from '@/acitons';
import { useState, useRef } from 'react';

interface UploadFormProps {
    onSuccess?: () => void;
}

export function UploadForm({ onSuccess }: UploadFormProps) {
    const inputFileRef = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [progress, setProgress] = useState<string>(''); // Yükleme durumu için

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);
        setProgress('Hazırlanıyor...');

        // FileList'i Array'e çeviriyoruz
        const files = Array.from(inputFileRef.current?.files || []);

        if (files.length === 0) {
            setError("Lütfen en az bir dosya seçin.");
            setIsLoading(false);
            return;
        }

        // Helper: Tek bir dosyanın boyutlarını okuma
        const getImageDimensions = (file: File): Promise<{ width: number; height: number }> => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve({ width: img.width, height: img.height });
                img.onerror = reject;
                img.src = URL.createObjectURL(file);
            });
        };

        try {

            const uploadPromises = files.map(async (file) => {
                const dims = await getImageDimensions(file);
                const newBlob = await upload(file.name, file, {
                    access: 'public',
                    handleUploadUrl: '/api/upload',
                });
                return {
                    url: newBlob.url,
                    alt: file.name.split('.')[0],
                    width: dims.width,
                    height: dims.height
                };
            });

            setProgress(`${files.length} dosya yükleniyor...`);

            // Tüm dosyaların Blob'a yüklenmesini bekle (Parallel Execution)
            const uploadedPhotosData = await Promise.all(uploadPromises);

            setProgress('Veritabanına kaydediliyor...');

            // 4. Batch Insert: Hepsini tek seferde server action'a gönder
            const result = await savePhotoReferences(uploadedPhotosData);

            if (result.status === 'error') {
                throw new Error(result.message);
            }

            // Başarılı
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
                        multiple // KRİTİK: Çoklu seçimi aktif eder
                        required
                        className="block w-full text-sm text-neutral-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-neutral-800 file:text-white hover:file:bg-neutral-700 cursor-pointer"
                    />
                </div>
                {/* Kaç dosya seçildiğini gösteren ufak bir bilgi (Opsiyonel ama iyi UX) */}
                <p className="text-xs text-neutral-500 mt-2">
                    Birden fazla fotoğraf seçebilirsiniz (CTRL veya CMD tuşu ile).
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