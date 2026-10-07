import { ChatResponse } from "@/types/  chat";
import {
  Sneaker,
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
  const { data } = await api.get<Sneaker & { _id?: string }>(`/sneackers/${id}`);
  if (!data) return data;
  return { ...data, id: data.id || data._id || id, name: data.name || data.title,
    title: data.title || data.name, image: data.image || data.images?.[0] || "",
    images: data.images || (data.image ? [data.image] : []) };
};
export const fetchCategories = async (): Promise<CategoriesResponse> => {
  const { data } = await api.get<CategoriesResponse>("/categories");
  return data;
};
export const fetchHistorySneackers = async (ids: string[]) => {
  const { data } = await api.get<Sneaker[]>("/sneackers/history", {
    params: {
      ids: ids.join(","),
    },
  });

  console.log("history response:", data);

  return data;
};
export const sendChatMessage = async (
  message: string,
  sessionId: string,
): Promise<ChatResponse> => {
  const { data } = await api.post<ChatResponse>("/chat", {
    message,
    sessionId,
  });

  return data;
};