import type { Category } from "../../../../types/sneaker";
import css from "./Filters.module.css";

interface Props {
  value: string;
  categories: Category[];
  onChange: (value: string) => void;
}

export default function CategorySelect({ value, categories, onChange }: Props) {
  return (
    <div className={css.filterWrap}>
      <button
        type="button"
        onClick={() => onChange("")}
        className={`${css.filterButton} ${value === "" ? css.active : ""}`}
      >
        All
      </button>

      {categories.map((cat) => (
        <button
          key={cat}
          type="button"
          onClick={() => onChange(cat)}
          className={`${css.categoryButton} ${value === cat ? css.active : ""}`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
