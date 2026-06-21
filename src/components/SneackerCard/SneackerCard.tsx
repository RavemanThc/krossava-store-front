import { useState } from "react";
import type { Sneaker } from "../../types/sneaker";
import css from "./SneackerCard.module.css";

const SneackerCard = ({
  sneaker,
  onSelect,
}: {
  sneaker: Sneaker;
  onSelect: () => void;
}) => {
  const [imgLoading, setImgLoading] = useState(true);

  return (
    <li key={sneaker.id} className={css.cardId}>
      <div className={css.card}>
        {/* 1. Левый блок: берем первые 5 элементов, рендерим их слева */}
        <ul className={`${css.wrapsize} ${css.leftSide}`}>
          {sneaker.sizes.slice(0, 5).map((sizeObj, index) => (
            <li className={css.size} key={index}>
              <button type="button" className={css.sizebutton}>
                {sizeObj.size}
              </button>
            </li>
          ))}
        </ul>

        {sneaker.sizes.length > 5 && (
          <ul className={`${css.wrapsize} ${css.rightSide}`}>
            {sneaker.sizes.slice(5).map((sizeObj, index) => (
              <li className={css.size} key={index}>
                <button type="button" className={css.sizebutton}>
                  {sizeObj.size}
                </button>
              </li>
            ))}
          </ul>
        )}
        <div className={css.imageBox}>
          {imgLoading && <div className={css.imgSpace} />}
          <img
            className={css.image}
            src={
              sneaker.images
                ? `${sneaker.images}`
                : "https://via.placeholder.com/500x750/ffffff/ffffff"
            }
            onLoad={() => setImgLoading(false)}
            onError={() => setImgLoading(true)}
            style={{
              opacity: imgLoading ? 0 : 1,
              transition: "opacity 0.2s ease",
            }}
            alt={sneaker.title}
            loading="lazy"
          />
        </div>
        <h2 className={css.title}>{sneaker.title}</h2>
      </div>
      <p className={css.price}>{sneaker.price}</p>
      <button onClick={onSelect}>Open Modal</button>
    </li>
  );
};

export default SneackerCard;
