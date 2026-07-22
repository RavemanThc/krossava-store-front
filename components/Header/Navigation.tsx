import Link from "next/link";
import styles from "./Header.module.css";
interface NavigationProps {
  onNavigate?: () => void;
}

export default function Navigation({ onNavigate }: NavigationProps) {
  return (
    <nav aria-label="Main Navigation">
      <ul className={styles.navigation}>
        <li className={styles.navigationLi}>
          <Link href="/" onClick={onNavigate} className={styles.navigationLink}>
            Головна
          </Link>
        </li>

        <li className={styles.navigationLi}>
          <Link
            href="/sneakers"
            onClick={onNavigate}
            className={styles.navigationLink}
          >
            Кросівки
          </Link>
        </li>

        <li className={styles.navigationLi}>
          <Link
            href="/cart"
            onClick={onNavigate}
            className={styles.navigationLink}
          >
            Кошик
          </Link>
        </li>

        <li className={styles.navigationLi}>
          <Link
            href="/about"
            onClick={onNavigate}
            className={styles.navigationLink}
          >
            Про нас
          </Link>
        </li>
      </ul>
    </nav>
  );
}
