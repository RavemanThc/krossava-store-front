import CartClient from "@/components/Cart/CartClient";
import css from "./Cart.module.css";
export default function CartPage() {
  return (
    <main>
      <h1 className={css.carttitle}>Кошик</h1>
      <CartClient />
    </main>
  );
}
