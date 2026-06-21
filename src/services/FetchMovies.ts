import axios from "axios";
import type {
  SneackerHttpResponse,
  SneackerQueryParams,
} from "../types/sneaker";

export const fetchSneackers = async (
  params: SneackerQueryParams,
): Promise<SneackerHttpResponse> => {
  const response = await axios.get<SneackerHttpResponse>(
    "http://localhost:3000/sneackers",
    {
      params,
    },
  );
  console.log(response);
  return response.data;
};
