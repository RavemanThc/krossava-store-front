"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { Category } from "@/types/sneaker";
import css from "./Filters.module.css";
import { useEffect, useRef } from "react";

interface Props {
  categories: Category[];
}

export default function CategorySelect({ categories }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
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
  const current = searchParams.get("search") || "";

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (!value) {
      params.delete("category");
      params.delete("search");
    } else {
      params.set("search", value);
    }

    params.delete("page");

    router.push(`/sneakers?${params.toString()}`);
  };

  return (
    <div className={css.filterallwrap}>
      <div
        className={css.filterWrap}
        ref={containerRef}
        onMouseEnter={stopAutoScroll}
        onTouchStart={stopAutoScroll}
      >
        <button
          onClick={() => handleChange("")}
          className={`${css.filterButton} ${current === "" ? css.active : ""}`}
        >
          Всі категорії
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleChange(cat)}
            className={`${css.categoryButton} ${
              current === cat ? css.active : ""
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <h1 className={css.title}>{current || "Всі кросівки"}</h1>
    </div>
  );
}
