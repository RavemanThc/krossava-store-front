import { useState } from "react";
import styles from "./SearchBar.module.css";
interface SubmitFormProp {
  onSubmit: (value: string) => void;
}

export default function SearchBar({ onSubmit }: SubmitFormProp) {
  const [error, setError] = useState("");
  const handleSearch = (formData: FormData) => {
    const query = formData.get("query") as string;
    if (!query.trim()) {
      setError("Please enter your search query");
      return;
    }
    setError("");
    onSubmit(query.trim());
  };
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="/"
          target="_blank"
          rel="noopener noreferrer"
        >
          KROSSAVA
        </a>
        <form action={handleSearch}>
          <input
            className={styles.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="New Balance..."
            autoFocus
          />
          <button type="submit" className={styles.button}>
            Search
          </button>
        </form>
        {error && <p>{error}</p>}
      </div>
    </header>
  );
}
