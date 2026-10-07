"use client";

import Link from "next/link";
import { PiSneakerMoveLight } from "react-icons/pi";
import { usePathname, useSearchParams } from "next/navigation";
import { catalogPageHref } from "@/src/lib/catalog-route";
import css from "./Pagination.module.css";

type Props = { totalPages: number; currentPage: number };

export default function PaginationButton({ totalPages, currentPage }: Props) {
  const pathname = usePathname();
  const query = useSearchParams().toString();
  if (totalPages <= 1) return null;
  const href = (page: number) => catalogPageHref(pathname, query, page);
  const pages = [...new Set([1, totalPages, ...Array.from({ length: 5 }, (_, i) => currentPage + i - 2)])]
    .filter(page => page >= 1 && page <= totalPages).sort((a, b) => a - b);
  return (
    <nav aria-label="Сторінки каталогу">
      <ul className={css.pagination}>
        {currentPage > 1 && <li><Link prefetch={false} href={href(currentPage - 1)} rel="prev" aria-label="Попередня сторінка"><PiSneakerMoveLight className={css.flipped} /></Link></li>}
        {pages.map((page, index) => (
          <li key={page} className={page === currentPage ? css.active : undefined}>
            <Link prefetch={false} href={href(page)} aria-current={page === currentPage ? "page" : undefined} aria-label={`Сторінка ${page}`}>
              {index > 0 && page - pages[index - 1] > 1 ? `… ${page}` : page}
            </Link>
          </li>
        ))}
        {currentPage < totalPages && <li><Link prefetch={false} href={href(currentPage + 1)} rel="next" aria-label="Наступна сторінка"><PiSneakerMoveLight /></Link></li>}
      </ul>
    </nav>
  );
}
