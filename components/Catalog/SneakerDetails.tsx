"use client";

import { useEffect, useState } from "react";
import { Size, Sneaker } from "@/types/sneaker";
import css from "./SneakerDetails.module.css";
import ProductGallery from "./ProductGallery";
import SizeChart from "./SizeChart";
import toast from "react-hot-toast";
import { useCart } from "@/src/store/cart";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useHistoryStore } from "@/src/store/historyStore";
type Props = {
  sneaker: Sneaker;
  initialSize?: string;
};

const SneakerDetailsClient = ({ sneaker, initialSize }: Props) => {
  const [selectedSize, setSelectedSize] = useState<Size | null>(() => sneaker.sizes.find(size => size.size === initialSize && size.quantity > 0) ?? null);
  const addToCart = useCart((state) => state.addToCart);
  const router = useRouter();
  const addToHistory = useHistoryStore((state) => state.addToHistory);
  useEffect(() => {
    addToHistory(sneaker.id);
  }, [sneaker.id, addToHistory]);
  const handleBack = () => {
    router.back();
  };
  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Оберіть розмір");
      return false;
    }

    const added = addToCart({
      sneaker,
      size: selectedSize.size,
      quantity: 1,
    });

    if (added) toast.success("додано в кошик");
    else
      toast.error(
        "Цей розмір відсутній або вся доступна кількість уже в кошику",
      );
    return added;
  };
  return (
    <>
      <section className={css.CardSection}>
        <button type="button" onClick={handleBack} className={css.backbutton}>
          Назад
        </button>
        <ProductGallery
          images={[sneaker.image, ...(sneaker.images || [])]}
          name={sneaker.name}
        />

        <div className={css.content}>
          <h1 className={css.title}>{sneaker.name}</h1>
          <p className={css.price}>{sneaker.price} грн</p>

          <div dangerouslySetInnerHTML={{ __html: sneaker.description }} />

          <p className={css.article}>арт: {sneaker.barcode}</p>
          <p>{sneaker.category}</p>
          <p className={css.purchaseTerms}>Доставка протягом 2 днів з моменту оформлення замовлення. Вартість — 70–150 грн залежно від населеного пункту. <Link href="/delivery">Умови доставки</Link></p>
          <p className={css.purchaseTerms}>Повернення та обмін протягом 14 днів з моменту отримання за умови збереження товарного вигляду. <Link href="/return-and-exchange-policy">Докладніше</Link></p>
          {/* SIZE SELECT */}
          <div className={css.sizeHeading}>
            <span>Розміри:</span>
            <SizeChart
              name={sneaker.name}
              rows={sneaker.sizeChart || []}
              sizes={sneaker.sizes}
              selectedSize={selectedSize?.size ?? null}
              onSelectSize={setSelectedSize}
              onAddToCart={handleAddToCart}
            />
          </div>
          <ul className={`${css.wrapsize} ${css.leftSide}`}>
            {sneaker.sizes.map((sizeObj, index) => (
              <li key={index} className={css.size}>
                <button
                  disabled={sizeObj.quantity <= 0}
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
