import type { Metadata } from "next";
import { FaPhoneAlt, FaViber, FaTelegramPlane, FaInstagram, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { contacts } from "@/src/lib/contacts";
import css from "./page.module.css";

const description = "Зв’яжіться з Krossava: телефон, Viber, Telegram, електронна пошта, Instagram та адреса в Одесі.";
export const metadata: Metadata = {
  title: "Контакти",
  description,
  alternates: { canonical: "/contacts" },
  openGraph: { title: "Контакти | Krossava", description, url: "/contacts" },
  twitter: { title: "Контакти | Krossava", description },
};

const channels = [
  { title: "Телефон", label: contacts.phoneLabel, href: `tel:${contacts.phone}`, icon: FaPhoneAlt },
  { title: "Viber", label: contacts.phoneLabel, href: `viber://chat?number=${encodeURIComponent(contacts.phone)}`, icon: FaViber },
  { title: "Telegram", label: "@KrossavaUA_manager", href: contacts.telegram, icon: FaTelegramPlane },
  { title: "Електронна пошта", label: contacts.email, href: `mailto:${contacts.email}`, icon: FaEnvelope },
  { title: "Instagram", label: "@kros_savaua", href: contacts.instagram, icon: FaInstagram },
];

export default function ContactsPage() {
  return (
    <section className={css.page} aria-labelledby="contacts-title">
      <header className={css.heading}>
        <p className={css.eyebrow}>KROSSAVA</p>
        <h1 id="contacts-title">Контакти</h1>
        <p>Допоможемо з вибором розміру та відповімо на запитання про замовлення. Оберіть зручний спосіб зв’язку.</p>
      </header>
      <ul className={css.grid}>
        {channels.map(({ title, label, href, icon: Icon }) => (
          <li key={title}>
            <a className={css.card} href={href}>
              <span className={css.icon}><Icon aria-hidden="true" /></span>
              <span className={css.details}><span className={css.label}>{title}</span><span className={css.value}>{label}</span></span>
              <span className={css.arrow} aria-hidden="true">↗</span>
            </a>
          </li>
        ))}
        <li className={css.addressCard}>
          <span className={css.icon}><FaMapMarkerAlt aria-hidden="true" /></span>
          <div className={css.details}>
            <h2 className={css.label}>Адреса</h2>
            <address className={css.address}>{contacts.address}</address>
            <a className={css.mapLink} href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contacts.address)}`}>Відкрити на мапі ↗</a>
          </div>
        </li>
      </ul>
    </section>
  );
}
