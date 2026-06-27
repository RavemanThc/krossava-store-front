import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import SneakerGrid from "./components/SneackerGrid/SneakerGrid";
import { fetchCategories, fetchSneackers } from "../../services/FetchSneakers";
import PaginationButton from "./components/pagination/Pagination";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import OrderForm from "./components/OrderForm/OrderForm";
import type { CartItem, Sneaker } from "../../types/sneaker";
import SneackerModal from "./components/SneackerModal/SneackerModal";
import SneakerModalContent from "./components/SneackerModal/SneackerModalContent";
import CategorySelect from "./components/Filters/CategoryFilter";

function App() {
  const [filters, setFilters] = useState({
    search: "",
    page: 1,
  });
  const [selectedSneaker, setSelectedSneaker] = useState<Sneaker | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  //поиск
  const { data, isLoading, isError } = useQuery({
    queryKey: ["sneakers", filters],
    queryFn: () => fetchSneackers({ ...filters, perPage: 10 }),
    placeholderData: (keepPreviousData) => keepPreviousData,
  });
  // категории
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
  const totalPages = data?.totalPages ?? 0;
  const sneakersToShow = data?.products || [];
  const addToCart = (sneaker: Sneaker, size: string) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.sneaker.id === sneaker.id && item.size === size,
      );

      if (existing) {
        return prev.map((item) =>
          item.sneaker.id === sneaker.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...prev, { sneaker, size, quantity: 1 }];
    });
  };
  const handleSearch = (newSearch: string) => {
    setFilters((prev) => ({
      ...prev,
      search: newSearch,
      page: 1,
    }));
  };

  const handleSelectSneaker = (sneaker: Sneaker, size: string) => {
    setSelectedSneaker(sneaker);
    setSelectedSize(size);
    addToCart(sneaker, size);
  };
  const closeModal = () => setIsModalOpen(false);
  const handleOpenModal = (sneaker: Sneaker) => {
    setSelectedSneaker(sneaker);
    setIsModalOpen(true);
  };
  const handleOrderSuccess = () => {
    setSelectedSneaker(null);
    setSelectedSize("");
  };
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <SearchBar onSubmit={handleSearch} />
      <CategorySelect
        value={filters.search}
        categories={categories}
        onChange={(value) => {
          setFilters((prev) => ({
            ...prev,
            search: value,
            page: 1,
          }));
        }}
      />{" "}
      <PaginationButton
        totalPages={totalPages}
        currentPage={filters.page}
        onPageChange={(newPage) =>
          setFilters((prev) => ({
            ...prev,
            page: newPage,
          }))
        }
      />
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error</p>}
      <SneakerGrid
        sneakers={sneakersToShow}
        onSelect={handleSelectSneaker}
        onModal={handleOpenModal}
      />
      {totalPages > 1 && (
        <PaginationButton
          totalPages={totalPages}
          currentPage={filters.page}
          onPageChange={(newPage) =>
            setFilters((prev) => ({
              ...prev,
              page: newPage,
            }))
          }
        />
      )}
      {selectedSneaker && selectedSize && (
        <OrderForm
          sneaker={selectedSneaker}
          selectedSize={selectedSize}
          onSubmitSuccess={handleOrderSuccess}
        />
      )}
      {isModalOpen && selectedSneaker && (
        <SneackerModal onClose={closeModal}>
          <SneakerModalContent
            sneaker={selectedSneaker}
            onSelect={handleSelectSneaker}
          />
        </SneackerModal>
      )}
    </>
  );
}

export default App;
