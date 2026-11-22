import type { Metadata } from "next";
import Link from "next/link";
import css from "@/components/Privacy/Privacy.module.css";
export const metadata: Metadata = { title: "Доставка", description: "Умови доставки замовлень Krossava та повернення товарів.", alternates: { canonical: "/delivery" } };
export default function DeliveryPage() {
  return <section className={css.privacy}><div className={css.privacyWrap}><div className={css.privacySubWrap}>
    <h1>Умови доставки</h1>
    <p>Доставка здійснюється протягом 2 днів з моменту оформлення замовлення.</p>
    <p>Вартість доставки становить від 70 до 150 грн залежно від населеного пункту та оплачується покупцем окремо. Точну вартість для вашого населеного пункту можна уточнити у менеджера через <Link href="/contacts">контакти магазину</Link>.</p>
    <h2>Повернення та обмін</h2>
    <p>Повернення та обмін можливі протягом 14 днів з моменту отримання товару за умови збереження його товарного вигляду.</p>
    <p><Link href="/return-and-exchange-policy">Докладні правила повернення та обміну</Link></p>
  </div></div></section>;
}
