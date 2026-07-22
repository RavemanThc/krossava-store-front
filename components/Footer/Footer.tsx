"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import css from "./Footer.module.css";

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className={css.footer}>
      <div className={css.container}>
        <nav className={css.navigation}>
          <Link href="/" className={css.link}>
            <Image
              src="/Logo.webp"
              alt="Krossava Logo"
              width={100}
              height={100}
              className={css.logo}
              priority
            />
          </Link>

          <ul className={css.list}>
            <li>
              <Link
                href="/privacy"
                className={`${css.link} ${
                  pathname === "/privacy" ? css.active : ""
                }`}
              >
                Договір публічної оферти
              </Link>
            </li>

            <li>
              <Link
                href="/privacy-policy"
                className={`${css.link} ${
                  pathname === "/privacy-policy" ? css.active : ""
                }`}
              >
                Політика конфіденційності
              </Link>
            </li>

            <li>
              <Link
                href="/return-and-exchange-policy"
                className={`${css.link} ${
                  pathname === "/return-and-exchange-policy" ? css.active : ""
                }`}
              >
                Правила повернення та обміну
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
