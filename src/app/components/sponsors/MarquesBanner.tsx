'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import MainBanner from './MainBanner';
import SecondaryBanners from './SecondaryBanners';

interface Banner {
  id: number;
  name: string;
  img: string;
  logo: string;
}

const MarquesBanner = () => {
  const [banners, setBanners] = useState<Banner[]>([
    { id: 1, name: 'Salomon', img: '/views/home/salomon.png', logo: 'views/logos/logoSalomon.png' },
    { id: 2, name: 'Red Bull', img: '/views/home/redbull.png', logo: 'views/logos/logoSalomon.png' },
    { id: 3, name: 'Billabong', img: '/views/home/billabong.png', logo: 'views/logos/logoSalomon.png' },
  ]);
  const [progress, setProgress] = useState(0);
  const router = useRouter();
  const scrollPositionRef = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollPositionRef.current = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          setBanners((prevBanners) => {
            const newBanners = [...prevBanners];
            const firstBanner = newBanners.shift();
            if (firstBanner) {
              newBanners.push(firstBanner);
            }
            return newBanners;
          });
          return 0;
        }
        return prevProgress + 10;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      router.push('/marketplace');
    }
  }, [progress, router]);

  useEffect(() => {
    window.scrollTo(0, scrollPositionRef.current);
  });

  return (
    <div className="relative w-full mx-auto px-24 py-7">
      <div className="absolute top-7 rounded-lg left-12 h-64 w-1 bg-gray-200 z-10">
        <div className="bg-gray-500 rounded-lg" style={{ height: `${progress}%` }}></div>
      </div>
      <MainBanner banner={banners[0]} />
      <SecondaryBanners banners={banners.slice(1)} />
    </div>
  );
};

export default MarquesBanner;
