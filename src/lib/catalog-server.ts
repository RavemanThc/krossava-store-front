import { cache } from "react";
import { unstable_cache } from "next/cache";
import { fetchCategories } from "./api";

// Share the lookup between metadata, route resolution and catalog rendering.
// Only category names are cached; prices and stock still come from fresh requests.
export const getCategories = cache(unstable_cache(
  fetchCategories,
  ["catalog-categories", process.env.NEXT_PUBLIC_API_URL || ""],
  { revalidate: 300 },
));
