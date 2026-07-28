import CartClient from "@/components/Cart/CartClient";
import css from "./Cart.module.css";
import RecentlyViewed from "@/components/RecentlyViewed/RecentlyViewed";
export default function CartPage() {
  return (
    <main>
      <h1 className={css.carttitle}>Кошик</h1>
      <CartClient />
      <RecentlyViewed />
    </main>
  );
}
