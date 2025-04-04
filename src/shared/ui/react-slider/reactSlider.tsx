"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface SliderProps {
  children: React.ReactNode[];
  modules: any[]; // Ensure this allows the correct modules
  spaceBetween: number;
  slidesPerView: number;
  navigation: boolean;
  pagination: {
    clickable: boolean;
    renderBullet: (index: number, className: string) => string;
  };
  autoplay: {
    delay: number;
  };
  className: string;
  min?: number; // Optional if you're using the slider for frequency range
  max?: number; // Optional
  step?: number; // Optional
  value?: number; // Optional
  onChange?: (value: number) => void; // Optional if using for frequency control
}

export const Slider: React.FC<SliderProps> = ({ children = [] }) => {
  if (children.length === 0) {
    return null;
  }

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={20}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      className="w-full min-h-64"
    >
      {children.map((child, index) => (
        <SwiperSlide key={index} className="flex justify-center items-center">
          {child}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
