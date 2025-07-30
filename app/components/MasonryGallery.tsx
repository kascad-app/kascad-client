"use client";

import Image from "next/image";
import Masonry from "react-masonry-css";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface MasonryGalleryProps {
  images: string[];
  onImageClick?: (index: number) => void;
  onAllImagesLoaded?: () => void;
}

export default function MasonryGallery({
  images,
  onImageClick,
  onAllImagesLoaded,
}: MasonryGalleryProps) {
  const galleryImages = images;
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    imageRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: i * 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [galleryImages]);
  useEffect(() => {
    const images = document.querySelectorAll<HTMLImageElement>("img[data-gallery]");
    if (images.length === 0) {
      onAllImagesLoaded?.();
      return;
    }

    let loadedCount = 0;

    images.forEach((img) => {
      if (img.complete) {
        loadedCount++;
      } else {
        img.onload = () => {
          loadedCount++;
          if (loadedCount === images.length) {
            onAllImagesLoaded?.();
          }
        };
        img.onerror = () => {
          loadedCount++;
          if (loadedCount === images.length) {
            onAllImagesLoaded?.();
          }
        };
      }
    });

    if (loadedCount === images.length) {
      onAllImagesLoaded?.();
    }
  }, [images, onAllImagesLoaded]);


  const breakpoints = {
    default: 4,
    1580: 3,
    768: 2,
    500: 1,
  };

  gsap.registerPlugin(ScrollTrigger);

  return (
    <Masonry
      breakpointCols={breakpoints}
      className="flex gap-4"
      columnClassName="masonry-column"
    >
      {galleryImages.map((img, index) => (
        <div
          key={index}
          ref={(el) => {
            imageRefs.current[index] = el;
          }}
          className="mb-4 cursor-pointer group opacity-0 translate-y-10"
          onClick={() => onImageClick?.(index + 1)}
        >
          <Image
            src={img}
            alt={`Image ${index + 1}`}
            width={300}
            height={400}
            data-gallery
            className="object-cover w-full h-auto rounded-lg shadow-md hover:shadow-xl transition-shadow"
          />
        </div>
      ))}
    </Masonry>
  );
}
