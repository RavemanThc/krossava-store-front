"use client";
import { useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { CatalogFiltersData, FilterOption } from "@/types/sneaker";
import { filterHref } from "@/src/lib/catalog-route";
import FilterDropdown from "./FilterDropdown";
import SizeFilter from "./SizeFilter";
import css from "./Filters.module.css";

type Props = { filters?: CatalogFiltersData };
export default function CatalogFilters({ filters }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [pending, startTransition] = useTransition();
  if (!filters) return <SizeFilter />;
  const change = (key: "brand" | "model" | "size", value: string) => {
    startTransition(() =>
      router.push(filterHref(pathname, params.toString(), key, value), {
        scroll: false,
      }),
    );
  };
  const field = (
    key: "brand" | "model" | "size",
    label: string,
    options: FilterOption[],
    disabled = false,
  ) => {
    const selected = params.get(key) || "";
    return (
      <FilterDropdown
        key={key}
        label={label}
        value={selected}
        options={options}
        disabled={pending || disabled}
        placeholder={disabled ? "Спочатку оберіть бренд" : "Всі"}
        onChange={value => change(key, value)}
      />
    );
  };
  return (
    <div
      className={css.catalogFilters}
      aria-label="Фільтри товарів"
      aria-busy={pending}
    >
      {!filters.categoryBrand && field("brand", "Бренд", filters.brands)}
      {field("model", "Модель", filters.models, !filters.brand)}
      {field("size", "Розмір", filters.sizes)}
      {(params.has("brand") || params.has("model") || params.has("size")) && (
        <button
          className={css.clearFilters}
          disabled={pending}
          onClick={() => {
            const next = new URLSearchParams(params.toString());
            for (const key of ["brand", "model", "size", "page"])
              next.delete(key);
            startTransition(() =>
              router.push(next.size ? `${pathname}?${next}` : pathname, {
                scroll: false,
              }),
            );
          }}
        >
          Скинути фільтри
        </button>
      )}
      <span className={css.filterStatus} role="status">
        {pending ? "Оновлюємо товари…" : ""}
      </span>
    </div>
  );
}
