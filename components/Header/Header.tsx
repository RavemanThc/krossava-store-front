import DesctopMenu from "./DesctopMenu";
import styles from "./Header.module.css";
import MobileMenu from "./MobileMenu";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <DesctopMenu />
        <MobileMenu />
      </div>
    </header>
  );
}
