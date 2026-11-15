"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { PiSneakerMoveLight } from "react-icons/pi";
import css from "./MainPage.module.css";

export default function PromoGallery({ children }: { children: ReactNode }) {
  const id = useId();
  const track = useRef<HTMLUListElement>(null);
  const pauseUntil = useRef(0);
  const [navigation, setNavigation] = useState({ overflow: false, previous: false, next: false });

  useEffect(() => {
    const element = track.current;
    if (!element) return;
    const update = () => {
      const remaining = element.scrollWidth - element.clientWidth;
      const next = {
        overflow: remaining > 2,
        previous: element.scrollLeft > 2,
        next: element.scrollLeft < remaining - 2,
      };
      setNavigation(previous => previous.overflow === next.overflow &&
        previous.previous === next.previous && previous.next === next.next ? previous : next);
    };
    const observer = new ResizeObserver(update);
    observer.observe(element);
    Array.from(element.children).forEach(child => observer.observe(child));
    element.addEventListener("scroll", update, { passive: true });
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const interval = window.setInterval(() => {
      if (document.hidden || reducedMotion.matches || Date.now() < pauseUntil.current) return;
      const remaining = element.scrollWidth - element.clientWidth;
      if (remaining <= 2) return;
      const first = element.firstElementChild;
      const step = first ? first.getBoundingClientRect().width + parseFloat(getComputedStyle(element).columnGap) : element.clientWidth;
      element.scrollTo({
        left: element.scrollLeft >= remaining - 2 ? 0 : Math.min(remaining, element.scrollLeft + step),
        behavior: "smooth",
      });
    }, 3000);
    update();
    return () => {
      window.clearInterval(interval);
      observer.disconnect();
      element.removeEventListener("scroll", update);
    };
  }, [children]);

  const move = (direction: number) => {
    const element = track.current;
    if (!element) return;
    const first = element.firstElementChild;
    const step = first ? first.getBoundingClientRect().width + parseFloat(getComputedStyle(element).columnGap) : element.clientWidth;
    element.scrollBy({ left: direction * step,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };

  return (
    <section className={css.heroPromo} aria-label="Сезонні колекції взуття"
      onPointerDown={() => { pauseUntil.current = Infinity; }}
      onPointerUp={() => { pauseUntil.current = Date.now() + 3000; }}
      onPointerCancel={() => { pauseUntil.current = Date.now() + 3000; }}
      onPointerLeave={() => {
        if (pauseUntil.current === Infinity) pauseUntil.current = Date.now() + 3000;
      }}
      onLostPointerCapture={() => { pauseUntil.current = Date.now() + 3000; }}
      onKeyDown={() => { pauseUntil.current = Date.now() + 3000; }}>
      <ul id={id} className={css.storyGallery} ref={track} tabIndex={0}
        aria-label="Колекції взуття — гортайте горизонтально"
        onKeyDown={event => {
          if (event.target !== event.currentTarget) return;
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault();
            move(event.key === "ArrowRight" ? 1 : -1);
          }
        }}>
        {children}
      </ul>
      {navigation.overflow && (
        <div className={css.promoControls}>
          <button type="button" aria-label="Попередні колекції" aria-controls={id}
            disabled={!navigation.previous} onClick={() => move(-1)}>
            <PiSneakerMoveLight className={css.promoPreviousIcon} aria-hidden="true" />
          </button>
          <button type="button" aria-label="Наступні колекції" aria-controls={id}
            disabled={!navigation.next} onClick={() => move(1)}>
            <PiSneakerMoveLight aria-hidden="true" />
          </button>
        </div>
      )}
    </section>
  );
}
