"use client";

import Image from "next/image";
import Masonry from "react-masonry-css";

interface MasonryGalleryProps {
    images: string[];
}

export default function MasonryGallery({ images }: MasonryGalleryProps) {
    const galleryImages = images.slice(1); // On saute la première image (déjà utilisée en haut)

    const breakpoints = {
        default: 4,
        1280: 3,
        768: 2,
        500: 1,
    };

    return (
        <Masonry
            breakpointCols={breakpoints}
            className="flex gap-4"
            columnClassName="masonry-column"
        >
            {galleryImages.map((img, index) => (
                <Image
                    key={index}
                    src={img}
                    alt={`Image ${index + 1}`}
                    width={300}
                    height={400}
                    className="mb-4 object-cover  w-full h-auto"
                />
            ))}
        </Masonry>
    );
}
