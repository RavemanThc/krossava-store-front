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
  name: string;
  category: string;
  price: number;
  image: string;
  images?: string[];
  description: string;
  sizes: Size[];
  barcode: string;
}
export interface SneackerHttpResponse {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  products: Sneaker[];
}
export type CartItem = {
  sneaker: Sneaker;
  size: string;
  quantity: number;
};
export type Category = string;
export type CategoriesResponse = Category[];
