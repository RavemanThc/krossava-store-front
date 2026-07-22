"use client";
import { IoMdArrowDropdown } from "react-icons/io";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import css from "./Filters.module.css";

const sizes = [
  "36",
  "37",
  "38",
  "39",
  "40",
  "41",
  "42",
  "43",
  "44",
  "45",
  "46",
  "47",
  "48",
];

export default function SizeFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [open, setOpen] = useState(false);

  const currentSize = searchParams.get("size") || "";

  const handleSize = (size: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (!size) {
      params.delete("size");
    } else {
      params.set("size", size);
    }

    params.delete("page");

    router.push(`/sneakers?${params.toString()}`);

    setOpen(false);
  };

  return (
    <div className={css.dropdown}>
      <button
        className={css.dropdownButton}
        onClick={() => setOpen((prev) => !prev)}
      >
        Обрати розмір:{currentSize || "Розмір"}{" "}
        <IoMdArrowDropdown
          className={`${css.dropIcon} ${open ? css.rotate : ""}`}
        />
      </button>

      {open && (
        <div className={css.dropdownMenu}>
          <button
            onClick={() => handleSize("")}
            className={currentSize === "" ? css.active : ""}
          >
            Всі
          </button>

          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => handleSize(size)}
              className={currentSize === size ? css.active : ""}
            >
              {size}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
