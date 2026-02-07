import { StaticImageData } from "next/image";

import hz1 from "@/photos/hz/hz-1.jpeg";
import hz2 from "@/photos/hz/hz-2.jpeg";
import hz3 from "@/photos/hz/hz-3.jpeg";
import hz4 from "@/photos/hz/hz-4.jpeg";
import hz5 from "@/photos/hz/hz-5.jpeg";
import hz6 from "@/photos/hz/hz-6.jpeg";
import hz7 from "@/photos/hz/hz-7.jpeg";
import hz8 from "@/photos/hz/hz-8.jpeg";
import hz9 from "@/photos/hz/hz-9.jpeg";
import hz10 from "@/photos/hz/hz-10.jpeg";
import hz11 from "@/photos/hz/hz-11.jpeg";
import hz12 from "@/photos/hz/hz-12.jpeg";
import hz13 from "@/photos/hz/hz-13.jpeg";
import hz14 from "@/photos/hz/hz-14.jpeg";
import hz15 from "@/photos/hz/hz-15.jpeg";
import hz16 from "@/photos/hz/hz-16.jpeg";
import hz17 from "@/photos/hz/hz-17.jpeg";
import hz18 from "@/photos/hz/hz-18.jpeg";
import hz19 from "@/photos/hz/hz-19.jpeg";
import hz20 from "@/photos/hz/hz-20.jpeg";
import hz21 from "@/photos/hz/hz-21.jpeg";
import hz22 from "@/photos/hz/hz-22.jpeg";
import hz23 from "@/photos/hz/hz-23.jpeg";
import hz24 from "@/photos/hz/hz-24.jpeg";
import hz25 from "@/photos/hz/hz-25.jpeg";
import hz26 from "@/photos/hz/hz-26.jpeg";
import hz27 from "@/photos/hz/hz-27.jpeg";

const rawImages: StaticImageData[] = [
    hz1, hz2, hz3, hz4, hz5, hz6, hz7, hz8, hz9,
    hz10, hz11, hz12, hz13, hz14, hz15, hz16, hz17, hz18,
    hz19, hz20, hz21, hz22, hz23, hz24, hz25, hz26, hz27
];

export const photos = rawImages.map((image, index) => ({
    id: index + 1,
    src: image.src,
    width: image.width,
    height: image.height,
    blurDataURL: image.blurDataURL,
    alt: `Galeri Fotoğrafı ${index + 1}`
}));