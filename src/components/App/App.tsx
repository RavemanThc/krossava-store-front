import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import SneakerGrid from "../MovieGrid/SneakerGrid";
import { fetchSneackers } from "../../services/FetchMovies";
import PaginationButton from "./pagination/Pagination";

import { useQuery } from "@tanstack/react-query";
import type { Sneaker } from "../../types/sneaker";
import { LoadMore } from "./pagination/LoadMore";

function App() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0); // 0-based для API
  const [accumulatedSneakers, setAccumulatedSneakers] = useState<Sneaker[]>([]);
  const [isInfinite, setIsInfinite] = useState(false);

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["sneakers", search, page], // Каждая страница — отдельный кэш
    queryFn: () => fetchSneackers({ search, page, perPage: 10 }),
    // Проп placeholderData предотвращает "мигание" интерфейса при смене страницы
    placeholderData: (keepPreviousData) => keepPreviousData,
  });

  // Следим за выгрузкой данных
  const totalPages = data?.totalPages ?? 0;
  const hasNextPage = page + 1 < totalPages;

  // Эффект для режима "Infinity": дописываем новые продукты в стейт
  // ВАЖНО: При смене страницы обычной пагинацией мы будем заменять стейт, а при Load More — добавлять.
  const currentProducts = data?.products || [];

  const handleSearch = (query: string) => {
    setSearch(query);
    setPage(0);
    setAccumulatedSneakers([]);
  };

  const handlePageChange = (newPage: number) => {
    setIsInfinite(false);
    setPage(newPage - 1); // Переводим 1-based в 0-based
  };

  const handleLoadMore = () => {
    if (hasNextPage && !isFetching) {
      setIsInfinite(true);
      // Сначала сохраняем то, что уже было на экране, перед тем как переключить страницу
      setAccumulatedSneakers((prev) => (prev.length ? prev : currentProducts));
      setPage((prev) => prev + 1);
    }
  };

  // Выбираем, что рендерить
  const sneakersToShow = isInfinite
    ? [...accumulatedSneakers, ...currentProducts]
    : currentProducts;

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      <PaginationButton
        totalPages={totalPages}
        currentPage={page + 1}
        onPageChange={handlePageChange}
      />
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error</p>}
      <SneakerGrid sneakers={sneakersToShow} onSelect={() => {}} />{" "}
      <LoadMore
        onClick={handleLoadMore}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetching && isInfinite}
      />
    </>
  );
}

export default App;
