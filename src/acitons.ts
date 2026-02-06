'use server'

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';

export type SavePhotoState = {
    status: 'idle' | 'success' | 'error';
    message: string;
};

interface SavePhotoDTO {
    url: string;
    alt: string;
    width: number;
    height: number;
}

export async function saveEngagementReferences(photos: SavePhotoDTO[]): Promise<SavePhotoState> {
    try {
        if (!photos || photos.length === 0) {
            throw new Error('Kaydedilecek veri bulunamadı.');
        }

        console.log(`Saving ${photos.length} photos to DB...`);

        const insertPromises = photos.map(photo =>
            sql`
                INSERT INTO engagement (url, alt, width, height)
                VALUES (${photo.url}, ${photo.alt}, ${photo.width}, ${photo.height})
            `
        );

        await Promise.all(insertPromises);

        revalidatePath('/');

        return {
            status: 'success',
            message: `${photos.length} fotoğraf başarıyla yüklendi ve kaydedildi.`
        };

    } catch (error) {
        console.error('DB Error:', error);
        return {
            status: 'error',
            message: 'Veritabanı kayıt işlemi sırasında bir hata oluştu.'
        };
    }
}