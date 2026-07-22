"use client";

import ReactPaginate from "react-paginate";
import { PiSneakerMoveLight } from "react-icons/pi";
import { useRouter, useSearchParams } from "next/navigation";
import css from "./Pagination.module.css";

interface Props {
  totalPages: number;
  currentPage: number;
}

export default function PaginationButton({ totalPages, currentPage }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return <div className={css.paginationWrapper}></div>;

  const handlePageChange = (event: { selected: number }) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(event.selected + 1));
    router.push(`/sneakers?${params.toString()}`);
  };

  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={handlePageChange}
      forcePage={currentPage - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel={<PiSneakerMoveLight />}
      previousLabel={<PiSneakerMoveLight className={css.flipped} />}
    />
  );
}
