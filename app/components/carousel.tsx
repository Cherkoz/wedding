'use client';

import { Pagination } from 'swiper/modules';
import { Swiper } from 'swiper/react';
import type { ReactNode } from 'react';

import 'swiper/css';
import 'swiper/css/pagination';

interface CarouselProps {
  children: ReactNode;
  breakpoints: {
    [key: number]: {
      slidesPerView: number;
    };
  };
  spaceBetween?: number;
  className?: string;
}

export function Carousel({
  children,
  breakpoints,
  spaceBetween = 24,
  className = 'overflow-visible! pb-16.5!',
}: CarouselProps) {
  return (
    <div className="">
      <div className="dark:from-background dark:to-background/0 absolute top-0 left-0 z-50 h-full w-4 bg-gradient-to-r from-white to-white/0 md:w-10 xl:w-[calc((100%-1280px)/2)]"></div>
      <div className="dark:from-background dark:to-background/0 absolute top-0 right-0 z-50 h-full w-4 bg-gradient-to-l from-white to-white/0 md:w-10 xl:w-[calc((100%-1280px)/2)]"></div>

      <div className="container">
        <Swiper
          modules={[Pagination]}
          spaceBetween={spaceBetween}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          breakpoints={breakpoints}
          className={className}>
          {children}
        </Swiper>
      </div>
    </div>
  );
}
