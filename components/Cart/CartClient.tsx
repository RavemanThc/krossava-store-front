"use client";

import Image from "next/image";
import css from "./Cart.module.css";
import { useCart } from "@/src/store/cart";
import {
  MdOutlineRemoveCircleOutline,
  MdOutlineAddCircleOutline,
  MdDelete,
} from "react-icons/md";
import OrderForm from "./OrderForm";

export default function CartClient() {
  const items = useCart((state) => state.items);
  const removeFromCart = useCart((state) => state.removeFromCart);
  const removeQuantity = useCart((state) => state.decreaseQuantity);
  const addQuantity = useCart((state) => state.addQuantity);

  return (
    <div>
      {items.map((item) => (
        <div key={`${item.sneaker.id}-${item.size}`} className={css.itemwrap}>
          <Image
            src={item.sneaker.image}
            alt={item.sneaker.name}
            width={600}
            height={600}
          />

          <div className={css.textwrap}>
            <p>{item.sneaker.name}</p>

            <p className={css.size}>
              розмір: <span className={css.bolditem}>{item.size}</span>
            </p>

            <p className={css.quantity}>
              кількість:
              <button
                className={css.removeqouantity}
                onClick={() => removeQuantity(item.sneaker.id, item.size)}
              >
                <MdOutlineRemoveCircleOutline />
              </button>
              <span className={css.bolditem}> {item.quantity}</span>
              <button
                className={css.addquantity}
                onClick={() => addQuantity(item.sneaker.id, item.size)}
              >
                <MdOutlineAddCircleOutline />
              </button>
            </p>

            <p>
              Ціна: <span className={css.bolditem}>{item.sneaker.price}</span>
            </p>
          </div>

          <button
            className={css.buttondelete}
            onClick={() => removeFromCart(item.sneaker.id, item.size)}
          >
            <MdDelete className={css.deleteicon} />
          </button>
        </div>
      ))}
      {items.length > 0 && <OrderForm />}
    </div>
  );
}
