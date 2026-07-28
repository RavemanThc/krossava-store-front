"use client";

import { useEffect, useState } from "react";
import { useHistoryStore } from "@/src/store/historyStore";
import { Sneaker } from "@/types/sneaker";
import { fetchHistorySneackers } from "@/src/lib/api";
import Image from "next/image";
import css from "./RecentlyViewed.module.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const RecentlyViewed = () => {
  const history = useHistoryStore((state) => state.history);

  const [items, setItems] = useState<Sneaker[]>([]);

  useEffect(() => {
    if (!history.length) return;

    fetchHistorySneackers(history).then(setItems);
  }, [history]);

  if (!history.length || !items.length) {
    return null;
  }

  return (
    <div className={css.HistoryMAin}>
      <h2 className={css.historytitle}>Нещодавно переглянуті</h2>

      <div className={css.History}>
        <Swiper
          className={css.HistoryWrap}
          modules={[Navigation]}
          navigation
          spaceBetween={16}
          slidesPerView={1.5}
          breakpoints={{
            375: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
            1440: {
              slidesPerView: 6,
            },
          }}
        >
          {items.map((item) => (
            <SwiperSlide key={item.id}>
              <div className={css.historycard}>
                <Image
                  className={css.historyimage}
                  src={item.images?.[0] ?? "/placeholder.png"}
                  alt={item.name}
                  width={200}
                  height={200}
                />

                <h4 className={css.title}>{item.name}</h4>
                <p>{item.price} грн</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default RecentlyViewed;
