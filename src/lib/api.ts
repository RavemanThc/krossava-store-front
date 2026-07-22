import {
  CategoriesResponse,
  SneackerHttpResponse,
  SneackerQueryParams,
} from "@/types/sneaker";
import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const fetchSneackers = async (
  params?: SneackerQueryParams,
): Promise<SneackerHttpResponse> => {
  const { data } = await api.get<SneackerHttpResponse>("/sneackers", {
    params,
  });

  return data;
};
export const fetchSneackersById = async (id: string) => {
  const { data } = await api.get(`/sneackers/${id}`);
  return data;
};
export const fetchCategories = async (): Promise<CategoriesResponse> => {
  const { data } = await api.get<CategoriesResponse>("/categories");
  return data;
};
