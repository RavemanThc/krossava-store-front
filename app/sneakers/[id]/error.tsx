"use client";

import { useRouter } from "next/navigation";
import styles from "./error.module.css";

type Props = {
  error: Error;
};

export default function Error({ error }: Props) {
  const router = useRouter();

  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <h2 className={styles.title}>Кросівки не знайдено</h2>

        <p className={styles.text}>{error.message || "Щось пішло не так"}</p>

        <button className={styles.button} onClick={() => router.back()}>
          Назад
        </button>
      </div>
    </div>
  );
}
