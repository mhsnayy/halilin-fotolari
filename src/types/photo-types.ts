import { StaticImageData } from "next/image";

export interface Photo {
    id: number;
    src: StaticImageData | string;
    alt: string;
    width: number;
    height: number;
    category?: string;
}