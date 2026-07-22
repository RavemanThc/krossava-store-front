"use client";
import { useState } from "react";

import css from "./SneackerCard.module.css";
import { Sneaker } from "@/types/sneaker";
import Link from "next/link";
import Image from "next/image";

interface SneackerCard {
  sneaker: Sneaker;
  onSelect: (sneaker: Sneaker, size: string) => void;
}

const SneackerItem = ({ sneaker, onSelect }: SneackerCard) => {
  const [imgLoading, setImgLoading] = useState(true);

  return (
    <li className={css.listitem}>
      <Link href={`/sneakers/${sneaker.id}`} className={css.linkWrap}>
        <div className={css.card}>
          {/* 1. Левый блок: берем первые 5 элементов, рендерим их слева */}
          <ul className={`${css.wrapsize} ${css.leftSide}`}>
            {sneaker.sizes.slice(0, 5).map((sizeObj, index) => (
              <li className={css.size} key={index}>
                <button
                  type="button"
                  className={css.sizebutton}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect(sneaker, sizeObj.size);
                  }}
                >
                  {sizeObj.size}
                </button>
              </li>
            ))}
          </ul>

          {sneaker.sizes.length > 5 && (
            <ul className={`${css.wrapsize} ${css.rightSide}`}>
              {sneaker.sizes.slice(5).map((sizeObj, index) => (
                <li className={css.size} key={index}>
                  <button
                    type="button"
                    className={css.sizebutton}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelect(sneaker, sizeObj.size);
                    }}
                  >
                    {sizeObj.size}
                  </button>
                </li>
              ))}
            </ul>
          )}
          <div className={css.imageBox}>
            {imgLoading && <div className={css.imgSpace} />}
            <Image
              className={css.image}
              src={sneaker.images?.[0] ?? "https://via.placeholder.com/500x750"}
              onLoad={() => setImgLoading(false)}
              onError={() => setImgLoading(true)}
              style={{
                opacity: imgLoading ? 0 : 1,
                transition: "opacity 0.2s ease",
              }}
              alt={sneaker.title}
              width={600}
              height={600}
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 363px"
            />
          </div>
          <h2 className={css.title}>{sneaker.title}</h2>
        </div>
        <ul className={`${css.wrapsizemob} ${css.leftSide}`}>
          {sneaker.sizes.map((sizeObj, index) => (
            <li className={css.size} key={index}>
              <button
                type="button"
                className={css.sizebutton}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(sneaker, sizeObj.size);
                }}
              >
                {sizeObj.size}
              </button>
            </li>
          ))}
        </ul>
        <p className={css.price}>Ціна:{sneaker.price}</p>
        <p className={css.barcode}>Артикль: {sneaker.barcode}</p>
      </Link>
    </li>
  );
};

export default SneackerItem;
