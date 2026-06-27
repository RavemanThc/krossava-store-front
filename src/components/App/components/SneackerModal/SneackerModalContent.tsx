import css from "./SneackerModal.module.css";

import type { Sneaker } from "../../../../types/sneaker";

interface Props {
  sneaker: Sneaker;
  onSelect: (sneaker: Sneaker, size: string) => void;
}

export default function SneakerModalContent({ sneaker, onSelect }: Props) {
  return (
    <>
      {sneaker.images.map((img, index) => (
        <img key={index} src={img} alt={sneaker.title} className={css.image} />
      ))}
      <h2 className={css.title}>{sneaker.title}</h2>

      <p className={css.price}>ціна:{sneaker.price}</p>
      <div
        dangerouslySetInnerHTML={{
          __html: sneaker.description,
        }}
      />
      <div>
        {sneaker.sizes.map((s) => (
          <button
            className={css.buttonSize}
            key={s.size}
            onClick={() => onSelect(sneaker, s.size)}
          >
            {s.size}
          </button>
        ))}
      </div>
    </>
  );
}
