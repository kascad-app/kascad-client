"use client";
import { useEffect, useState } from "react";
import "./profile.css";

export default function ProfilePage() {
  const [loading, setLoading] = useState(0);
  const [resetting, setResetting] = useState(false);

  const images = [
    "./views/profile/Carousel.png",
    "./views/profile/Carousel2.webp",
    "./views/profile/Carousel3.webp",
    "./views/profile/Carousel4.webp",
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (loading < images.length) {
      timer = setTimeout(() => {
        setLoading(loading + 1);
      }, 5000); // Duration for each image
    } else {
      // Set resetting state to true and reset loading to 0 instantly
      setResetting(true);
      setLoading(0);
    }

    return () => clearTimeout(timer);
  }, [loading]);

  useEffect(() => {
    if (resetting) {
      // Wait a brief moment to visually reset the bars, then show the first image
      setTimeout(() => {
        setResetting(false);
      }, 100); // Adjust the delay as needed
    }
  }, [loading, resetting]);

  const handleSpanClick = (index: number) => {
    // Update the loading state to the clicked span index
    setLoading(index); // Index is zero-based, so add 1 to match loading state
  };

  return (
    <>
      <header className="w-full h-screen overflow-y-hidden relative image-gradient">
        <div className="z-10 absolute inset-x-1/2 top-20 transform -translate-x-1/2 w-10/12 rounded-2xl opacity-50 font-bold bg-[#C8C8C8] ">
          <h1 className=" font-figtree opacity-100 text-8xl px-8 py-12 text-white">
            Candide <span className="text-common-green">Thovex</span>
          </h1>
        </div>
        <img className="w-full" src={images[loading]} alt="Carousel" />
        <div className="absolute z-10 bottom-40 inset-x-1/2 h-4 flex w-fit">
          {images.map((_, index) => (
            <span
              key={index}
              className="w-12 h-2 mx-2 rounded-full bg-gray-300 relative overflow-hidden cursor-pointer"
              onClick={() => handleSpanClick(index)}
            >
              <span
                className={`absolute top-0 left-0 h-full bg-common-green transition-all ${
                  resetting || index != loading
                    ? "duration-[0s]"
                    : "duration-[5s]"
                } ${
                  resetting
                    ? "w-0"
                    : loading > index
                    ? "w-full"
                    : loading === index
                    ? "w-full"
                    : "w-0"
                }`}
              ></span>
            </span>
          ))}
        </div>
      </header>
      <section className="w-full h-screen bg-white"></section>
    </>
  );
}
