"use client";
import { FiSearch } from "react-icons/fi";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Header.module.css";
interface SubmitFormProp {
  onSubmit?: (value: string) => void;
}

export default function SearchBar({ onSubmit }: SubmitFormProp) {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSearch = (formData: FormData) => {
    const query = String(formData.get("query") ?? "").trim();

    if (!query) {
      setError("Будь ласка введіть назву або артикль");
      return;
    }

    setError("");

    onSubmit?.(query);
    router.push(`/sneakers?search=${encodeURIComponent(query)}`);
  };

  return (
    <form action={handleSearch} className={styles.form}>
      <div className={styles.searchForm}>
        <label htmlFor="search-input" className={styles.visuallyHidden}>
          Пошук товарів
        </label>

        <input
          id="search-input"
          name="query"
          className={styles.input}
          placeholder="Пошук"
        />

        <button
          type="submit"
          aria-label="Пошук"
          className={styles.buttonPlaceholder}
        >
          <FiSearch aria-hidden="true" />
        </button>
      </div>

      <button type="submit" className={styles.button}>
        Пошук
      </button>

      {error && <p>{error}</p>}
    </form>
  );
}
