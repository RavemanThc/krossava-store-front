"use client";

import Link from "next/link";
import { categoryPath } from "@/src/lib/catalog-route";
import type { Category } from "@/types/sneaker";
import css from "./Filters.module.css";
import { useEffect, useRef } from "react";

interface Props {
  categories: Category[];
  current?: string;
}

export default function CategorySelect({ categories, current = "" }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollInterval = useRef<NodeJS.Timeout | null>(null);

  const startAutoScroll = () => {
    if (scrollInterval.current) return;

    scrollInterval.current = setInterval(() => {
      if (containerRef.current) {
        // Прокручиваем на 1 пиксель каждые 30мс
        containerRef.current.scrollLeft += 1;

        if (
          containerRef.current.scrollLeft >=
          containerRef.current.scrollWidth - containerRef.current.clientWidth
        ) {
          containerRef.current.scrollLeft = 0;
        }
      }
    }, 30);
  };

  const stopAutoScroll = () => {
    if (scrollInterval.current) {
      clearInterval(scrollInterval.current);
      scrollInterval.current = null;
    }
  };

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, []);

  return (
    <div className={css.filterallwrap}>
      <div
        className={css.filterWrap}
        ref={containerRef}
        onMouseEnter={stopAutoScroll}
        onTouchStart={stopAutoScroll}
      >
        <Link
          href="/sneakers"
          prefetch={false}
          className={`${css.filterButton} ${current === "" ? css.active : ""}`}
        >
          Всі категорії
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat}
            href={categoryPath(cat)}
            prefetch={false}
            className={`${css.categoryButton} ${
              current === cat ? css.active : ""
            }`}
          >
            {cat}
          </Link>
        ))}
      </div>

    </div>
  );
}
