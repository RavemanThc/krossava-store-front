"use client";
import { IoCartOutline } from "react-icons/io5";

import Link from "next/link";
import { useCart } from "@/src/store/cart";
import css from "./FloatingCart.module.css";

export default function FloatingCart() {
  const items = useCart((state) => state.items);

  if (items.length === 0) return null;

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Link href="/cart" className={css.cart}>
      <IoCartOutline className={css.icon} />

      <span className={css.badge}>{totalItems}</span>
    </Link>
  );
}
