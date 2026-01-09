'use client';

import { SwiperSlide } from "swiper/react";
import { Carousel } from "./carousel";
import Image from "next/image";

export function CarouselLocation() {
    const items = [
        {
          id: 1,
        },
        {
          id: 2,
        },
        {
          id: 3,
        },
        {
          id: 4,
        },
    ];

    const breakpoints = {
        768: {
          slidesPerView: 1,
        },
        1024: {
          slidesPerView: 2,
        },
      };

    return (
        <Carousel breakpoints={breakpoints}>
            {items.map((item) => (
                 <SwiperSlide key={item.id} className="h-auto!">
                    <div className="relative aspect-video overflow-hidden rounded-2xl">
                        <Image
                            src={`/assets/images/catch/${item.id}.webp`}
                            fill
                            alt=""
                            className="object-cover"
                        />
                    </div>
                 </SwiperSlide>
            ))}
        </Carousel>
    );
}