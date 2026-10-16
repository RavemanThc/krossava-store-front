"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Keyboard, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import css from "./ProductGallery.module.css";

type Props = { images: string[]; name: string };

export default function ProductGallery({ images, name }: Props) {
  const photos = [...new Set(images.filter(Boolean))];
  if (!photos.length) return <div className={css.gallery}>Фото готується</div>;
  return (
    <div className={css.gallery}>
      <Swiper
        modules={[A11y, Keyboard, Navigation, Pagination]}
        slidesPerView={1}
        navigation={photos.length > 1}
        pagination={photos.length > 1 ? { clickable: true, dynamicBullets: true } : false}
        keyboard={{ enabled: true, onlyInViewport: true }}
        watchOverflow
        a11y={{ prevSlideMessage: "Попереднє фото", nextSlideMessage: "Наступне фото", paginationBulletMessage: "Фото {{index}}" }}
      >
        {photos.map((src, index) => (
          <SwiperSlide key={src}>
            <div className={css.frame}>
              <Image
                src={src}
                alt={`${name} — фото ${index + 1}`}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                priority={index === 0}
                className={css.image}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
