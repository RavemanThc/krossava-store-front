export interface Movie {
  id: number;
  poster_path: string;
  backdrop_path: string;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
}
export interface MovieHttpResponse {
  results: Movie[];
}

export interface Size {
  size: string;
  quantity: number;
}
export interface SneackerQueryParams {
  page?: number;
  perPage?: number;
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  size?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
export interface Sneaker {
  id: string;
  groupId: string;
  title: string;
  category: "nike" | "adidas" | "asics" | "new balance" | "Puma";
  price: number;
  images: string[];
  description: string;
  sizes: Size[];
}
export interface SneackerHttpResponse {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  products: Sneaker[];
}
