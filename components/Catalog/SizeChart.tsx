"use client";

import { useId, useRef } from "react";
import { PiRulerLight } from "react-icons/pi";
import type { Size } from "@/types/sneaker";
import css from "./SizeChart.module.css";

type Props = {
  name: string;
  rows: { size: string; cm: number }[];
  sizes: Size[];
  selectedSize: string | null;
  onSelectSize: (size: Size) => void;
  onAddToCart: () => boolean;
};

export default function SizeChart({ name, rows, sizes, selectedSize, onSelectSize, onAddToCart }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const canAdd = rows.some(row => row.size === selectedSize)
    && sizes.some(size => size.size === selectedSize && size.quantity > 0);
  return (
    <>
      <button type="button" className={css.trigger} onClick={() => dialog.current?.showModal()} aria-haspopup="dialog">
        <PiRulerLight aria-hidden="true" /> Розмірна сітка
      </button>
      <dialog ref={dialog} className={css.dialog} aria-labelledby={titleId}
        onClick={event => {
          if (event.target === event.currentTarget) {
            const box = event.currentTarget.getBoundingClientRect();
            if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.current?.close();
          }
        }}>
        <header className={css.header}>
          <h2 id={titleId}>Розмірна сітка</h2>
          <button type="button" aria-label="Закрити розмірну сітку" onClick={() => dialog.current?.close()} autoFocus>×</button>
        </header>
        <p className={css.name}>{name}</p>
        {rows.length ? (
          <>
            <table className={css.table}>
              <caption>Заміри постачальника для цієї моделі</caption>
              <thead><tr><th scope="col">Розмір</th><th scope="col">Довжина, см</th></tr></thead>
              <tbody>{rows.map(row => {
                const availableSize = sizes.find(size => size.size === row.size && size.quantity > 0);
                const selected = selectedSize === row.size;
                return (
                  <tr key={row.size} className={availableSize ? css.available : css.unavailable}
                    data-selected={selected && !!availableSize}
                    onClick={() => { if (availableSize) onSelectSize(availableSize); }}>
                    <th scope="row">
                      <button type="button" className={css.sizeOption} disabled={!availableSize}
                        aria-pressed={selected && !!availableSize}
                        aria-label={`Розмір ${row.size}, ${row.cm.toLocaleString("uk-UA")} см${availableSize ? "" : ", немає в наявності"}`}
                        onClick={event => { event.stopPropagation(); if (availableSize) onSelectSize(availableSize); }}>
                        {row.size}
                      </button>
                    </th>
                    <td>{row.cm.toLocaleString("uk-UA")}{!availableSize && <span className={css.stockNote}>Немає в наявності</span>}</td>
                  </tr>
                );
              })}</tbody>
            </table>
            {canAdd && <div className={css.actions}>
              <p aria-live="polite">Обрано розмір: <strong>{selectedSize}</strong></p>
              <button type="button" className={css.addButton} onClick={() => {
                if (onAddToCart()) dialog.current?.close();
              }}>Додати у кошик</button>
            </div>}
            <p className={css.note}>Оберіть доступний розмір у таблиці. Якщо потрібного заміру немає в таблиці, уточніть його перед замовленням.</p>
          </>
        ) : <p className={css.note}>Розмірну сітку цієї моделі уточнюємо у постачальника. Уточніть заміри перед замовленням.</p>}
      </dialog>
    </>
  );
}
