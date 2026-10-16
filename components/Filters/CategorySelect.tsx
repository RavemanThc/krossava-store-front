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
  useEffect(() => {
    containerRef.current?.querySelector('[aria-current="page"]')?.scrollIntoView({
      block: "nearest", inline: "nearest",
    });
  }, [current]);

  return (
    <div className={css.filterallwrap}>
      <div
        className={css.filterWrap}
        ref={containerRef}
      >
        <Link
          href="/sneakers"
          aria-current={current === "" ? "page" : undefined}
          className={`${css.filterButton} ${current === "" ? css.active : ""}`}
        >
          Всі категорії
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat}
            href={categoryPath(cat)}
            aria-current={current === cat ? "page" : undefined}
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
