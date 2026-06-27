import type {
  SneackerHttpResponse,
  SneackerQueryParams,
  CategoriesResponse,
} from "../types/sneaker";
import { api } from "./Api";

export const fetchSneackers = async (
  params: SneackerQueryParams,
): Promise<SneackerHttpResponse> => {
  const { data } = await api.get<SneackerHttpResponse>("/sneackers", {
    params,
  });

  return data;
};

export const fetchCategories = async (): Promise<CategoriesResponse> => {
  const { data } = await api.get<CategoriesResponse>("/categories");
  return data;
};
