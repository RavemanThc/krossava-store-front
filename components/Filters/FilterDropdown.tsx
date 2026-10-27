"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import type { FilterOption } from "@/types/sneaker";
import css from "./Filters.module.css";

type Props = {
  label: string;
  value: string;
  options: FilterOption[];
  disabled: boolean;
  placeholder: string;
  onChange: (value: string) => void;
};

export default function FilterDropdown({ label, value, options, disabled, placeholder, onChange }: Props) {
  const id = useId();
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const entries = [
    { value: "", text: placeholder },
    ...(value && !options.some(option => option.value === value) ? [{ value, text: `${value} (0)` }] : []),
    ...options.map(option => ({ value: option.value, text: `${option.value} (${option.count})` })),
  ];
  const expanded = open && !disabled;

  useEffect(() => {
    if (!expanded) return;
    const selected = list.current?.querySelector<HTMLButtonElement>('[aria-selected="true"]');
    selected?.focus({ preventScroll: true });
    selected?.scrollIntoView({ block: "nearest" });
    const outside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [expanded]);

  const close = () => { setOpen(false); trigger.current?.focus({ preventScroll: true }); };
  const navigate = (event: KeyboardEvent<HTMLDivElement>) => {
    const buttons = Array.from(list.current?.querySelectorAll<HTMLButtonElement>('[role="option"]') || []);
    const index = buttons.indexOf(document.activeElement as HTMLButtonElement);
    let next = index;
    if (event.key === "Escape") { event.preventDefault(); event.stopPropagation(); close(); return; }
    if (event.key === "ArrowDown") next = (index + 1) % buttons.length;
    else if (event.key === "ArrowUp") next = (index - 1 + buttons.length) % buttons.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = buttons.length - 1;
    else if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && event.key !== " ") {
      const ordered = [...buttons.slice(index + 1), ...buttons.slice(0, index + 1)];
      const match = ordered.find(button => button.textContent?.toLocaleLowerCase().startsWith(event.key.toLocaleLowerCase()));
      if (match) { event.preventDefault(); match.focus(); }
      return;
    } else return;
    event.preventDefault(); buttons[next]?.focus();
  };

  return (
    <div className={css.selectLabel}>
      <span id={`${id}-label`}>{label}</span>
      <div ref={root} className={css.filterDropdown} onBlur={event => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false);
      }}>
        <button ref={trigger} type="button" className={css.filterTrigger}
          disabled={disabled} aria-labelledby={`${id}-label ${id}-value`}
          aria-haspopup="listbox" aria-expanded={expanded} aria-controls={`${id}-list`}
          onClick={() => setOpen(!expanded)} onKeyDown={event => {
            if (event.key === "ArrowDown" || event.key === "ArrowUp") { event.preventDefault(); setOpen(true); }
          }}>
          <span id={`${id}-value`} className={css.filterValue}>{entries.find(entry => entry.value === value)?.text || placeholder}</span>
          <svg className={css.filterChevron} data-open={expanded} width="14" height="14" viewBox="0 0 16 16" aria-hidden="true"><path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
        </button>
        {expanded && <div ref={list} id={`${id}-list`} role="listbox" aria-labelledby={`${id}-label`}
          className={css.filterOptions} onKeyDown={navigate}>
          {entries.map(entry => <button type="button" role="option" aria-selected={entry.value === value}
            tabIndex={-1} key={entry.value} className={css.filterOption}
            onClick={() => { close(); onChange(entry.value); }}>{entry.text}</button>)}
        </div>}
      </div>
    </div>
  );
}
