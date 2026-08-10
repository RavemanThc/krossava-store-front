"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import css from "./MainPage.module.css";

const MainHero = () => {
  const sneakersRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sneakersRef.current) return;

    const sneakers = Array.from(
      sneakersRef.current.querySelectorAll<HTMLImageElement>("[data-sneaker]"),
    );

    const positions = [
      { x: 0, y: -680, rotation: 90 },
      { x: 680, y: 0, rotation: 0 },
      { x: 0, y: 680, rotation: 90 },
      { x: -680, y: 0, rotation: 0 },
    ];

    sneakers.forEach((sneaker, index) => {
      const position = positions[index];

      gsap.set(sneaker, {
        x: position.x,
        y: position.y,
        rotation: position.rotation,
      });
    });

    const timeline = gsap.timeline({
      repeat: -1,
      repeatDelay: 0.5,
    });

    for (let step = 0; step < 1000; step++) {
      sneakers.forEach((sneaker, index) => {
        const nextPosition = positions[(index + step + 1) % 4];

        timeline.to(
          sneaker,
          {
            x: nextPosition.x,
            y: nextPosition.y,
            rotation: nextPosition.rotation,
            duration: 1.2,
            ease: "power2.inOut",
          },
          step * 3,
        );
      });
    }

    return () => {
      timeline.kill();
    };
  }, []);

  return (
    <section className={css.HeroWrap} ref={sneakersRef}>
      <div className={css.HerosubWrap}>
        <div className={css.titleWrap}>
          <h1 className={css.title}>Кросівки на будь-який смак</h1>

          <p className={css.subtitle}>Купуй стильно і недорого</p>

          <button type="button" className={css.herobutton}>
            <Link href="/sneakers">До каталогу</Link>
          </button>
        </div>

        <div className={css.HeroSneakers}>
          <Image
            data-sneaker
            className={css.HeroImage}
            src="/Heroimg.webp"
            alt="Hero Sneaker"
            width={670}
            height={400}
          />

          <Image
            data-sneaker
            className={css.HeroImage}
            src="/Heroimg (2).webp"
            alt="Hero Sneaker"
            width={670}
            height={400}
          />

          <Image
            data-sneaker
            className={css.HeroImage}
            src="/Heroimg (3).webp"
            alt="Hero Sneaker"
            width={670}
            height={400}
          />

          <Image
            data-sneaker
            className={css.HeroImage}
            src="/Heroimg (4).webp"
            alt="Hero Sneaker"
            width={670}
            height={400}
          />
        </div>
      </div>
    </section>
  );
};

export default MainHero;
