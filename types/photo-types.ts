import { StaticImageData } from "next/image";

export interface Photo {
    id: number;
    src: StaticImageData | string; // Hem import hem url desteklesin
    alt: string;
    category?: string;
}