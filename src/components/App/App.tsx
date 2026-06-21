import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import SneakerGrid from "../MovieGrid/SneakerGrid";
import { fetchSneackers } from "../../services/FetchMovies";
import PaginationButton from "./pagination/Pagination";

import { useQuery } from "@tanstack/react-query";
import OrderForm from "./OrderForm/OrderForm";

function App() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["sneakers", search, page],
    queryFn: () => fetchSneackers({ search, page, perPage: 10 }),
    placeholderData: (keepPreviousData) => keepPreviousData,
  });

  const totalPages = data?.totalPages ?? 0;
  const sneakersToShow = data?.products || [];

  const handleSearch = async (newSearch: string) => {
    setSearch(newSearch);
    setPage(1);
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      <PaginationButton
        totalPages={totalPages}
        currentPage={page}
        onPageChange={setPage}
      />
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error</p>}
      <SneakerGrid sneakers={sneakersToShow} onSelect={() => {}} />{" "}
      {totalPages > 1 && (
        <PaginationButton
          totalPages={totalPages}
          currentPage={page} // Переводим 0-based в 1-based для отображения
          onPageChange={setPage}
        />
      )}
      <OrderForm />
    </>
  );
}

export default App;
