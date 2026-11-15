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

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const mobile = window.matchMedia("(max-width: 1023px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let interval: ReturnType<typeof setInterval> | undefined;
    let interacted = false;

    const stop = () => {
      clearInterval(interval);
      interval = undefined;
    };
    const update = () => {
      stop();
      if (!mobile.matches || reducedMotion.matches || interacted) return;

      interval = setInterval(() => {
        if (document.hidden) return;
        const maxScroll = container.scrollWidth - container.clientWidth;
        if (maxScroll <= 0) return;
        container.scrollLeft = container.scrollLeft >= maxScroll - 1
          ? 0
          : container.scrollLeft + 1;
      }, 30);
    };
    const onInteraction = () => {
      interacted = true;
      stop();
    };

    container.addEventListener("pointerdown", onInteraction);
    container.addEventListener("mouseenter", onInteraction);
    container.addEventListener("focusin", onInteraction);
    container.addEventListener("wheel", onInteraction, { passive: true });
    mobile.addEventListener("change", update);
    reducedMotion.addEventListener("change", update);
    update();

    return () => {
      stop();
      container.removeEventListener("pointerdown", onInteraction);
      container.removeEventListener("mouseenter", onInteraction);
      container.removeEventListener("focusin", onInteraction);
      container.removeEventListener("wheel", onInteraction);
      mobile.removeEventListener("change", update);
      reducedMotion.removeEventListener("change", update);
    };
  }, []);

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
