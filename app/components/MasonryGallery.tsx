"use client";

import Image from "next/image";
import Masonry from "react-masonry-css";

interface MasonryGalleryProps {
    images: string[];
    onImageClick?: (index: number) => void;
}

export default function MasonryGallery({ images, onImageClick }: MasonryGalleryProps) {
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
                <div
                    key={index}
                    className="mb-4 cursor-pointer"
                    onClick={() => onImageClick?.(index + 1)} // +1 car on a sauté la première image
                >
                    <Image
                        src={img}
                        alt={`Image ${index + 1}`}
                        width={300}
                        height={400}
                        className="object-cover w-full h-auto rounded-lg shadow-md hover:shadow-xl transition-shadow"
                    />
                </div>
            ))}
        </Masonry>
    );
}
