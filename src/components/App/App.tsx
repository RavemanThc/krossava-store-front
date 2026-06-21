import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import SneakerGrid from "../MovieGrid/SneakerGrid";
import { fetchSneackers } from "../../services/FetchMovies";
import PaginationButton from "./pagination/Pagination";

import { useQuery } from "@tanstack/react-query";
import OrderForm from "./OrderForm/OrderForm";

function App() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0); // 0-based для API

  const { data, isLoading, isError } = useQuery({
    queryKey: ["sneakers", search, page], // Каждая страница — отдельный кэш
    queryFn: () => fetchSneackers({ search, page, perPage: 10 }),
    // Предотвращает "мигание" интерфейса и прыжки экрана при смене страницы
    placeholderData: (keepPreviousData) => keepPreviousData,
  });

  const totalPages = data?.totalPages ?? 0;
  const sneakersToShow = data?.products || [];

  const handleSearch = (query: string) => {
    setSearch(query);
    setPage(0); // При новом поиске всегда сбрасываем на 1-ю страницу
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage - 1); // Переводим 1-based из компонента кнопки в 0-based для API
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error</p>}
      <SneakerGrid sneakers={sneakersToShow} onSelect={() => {}} />{" "}
      {totalPages > 1 && (
        <PaginationButton
          totalPages={totalPages}
          currentPage={page + 1} // Переводим 0-based в 1-based для отображения
          onPageChange={handlePageChange}
        />
      )}
      <OrderForm />
    </>
  );
}

export default App;
