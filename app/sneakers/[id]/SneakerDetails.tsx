"use client";

import { useState } from "react";
import { Size, Sneaker } from "@/types/sneaker";
import css from "./SneakerDetails.module.css";
import Image from "next/image";
import toast from "react-hot-toast";
import { useCart } from "@/src/store/cart";
import { useRouter } from "next/navigation";
type Props = {
  sneaker: Sneaker;
};

const SneakerDetailsClient = ({ sneaker }: Props) => {
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const addToCart = useCart((state) => state.addToCart);
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Выбери размер");
      return;
    }

    addToCart({
      sneaker,
      size: selectedSize.size,
      quantity: 1,
    });

    toast.success("Добавлено в корзину");
  };
  console.log("DETAILS SNEAKER:", sneaker);
  return (
    <>
      <section className={css.CardSection}>
        <button type="button" onClick={handleBack} className={css.backbutton}>
          Назад
        </button>
        <Image
          className={css.photo}
          src={sneaker.image}
          alt={sneaker.name}
          width={600}
          height={600}
          priority
        />

        <div className={css.content}>
          <h1 className={css.title}>{sneaker.name}</h1>
          <p className={css.price}>{sneaker.price} грн</p>

          <div dangerouslySetInnerHTML={{ __html: sneaker.description }} />

          <p className={css.article}>арт: {sneaker.barcode}</p>
          <p>{sneaker.category}</p>
          {/* SIZE SELECT */}
          <p>Розміри:</p>
          <ul className={`${css.wrapsize} ${css.leftSide}`}>
            {sneaker.sizes.map((sizeObj, index) => (
              <li key={index} className={css.size}>
                <button
                  type="button"
                  className={`${css.sizebutton} ${
                    selectedSize?.size === sizeObj.size ? css.active : ""
                  }`}
                  onClick={() => setSelectedSize(sizeObj)}
                >
                  {sizeObj.size}
                </button>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className={css.orderButton}
            onClick={handleAddToCart}
          >
            додати у кошик
          </button>
        </div>
      </section>
    </>
  );
};

export default SneakerDetailsClient;
