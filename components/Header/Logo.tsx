import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";

export default function Logo() {
  return (
    <Link href="/" className={styles.link}>
      <Image
        src="/Logo.webp"
        alt="Krossava Logo"
        width={100}
        height={100}
        className={styles.logo}
        priority
      />
    </Link>
  );
}
