export type CatalogQuery = {
  search?: string;
  category?: string;
  brand?: string;
  model?: string;
  size?: string;
  page?: string;
};

export function categorySlug(name: string): string {
  return name
    .normalize("NFKC")
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "");
}
export function categoryPath(name: string): string {
  return `/sneakers/${encodeURIComponent(categorySlug(name))}`;
}
export function catalogPageNumber(value?: string): number {
  const page = Number(value || 1);
  return Number.isSafeInteger(page) && page > 0 ? page : 1;
}
export function catalogPageHref(
  pathname: string,
  query: string,
  page: number,
): string {
  const params = new URLSearchParams(query);
  params.delete("page");
  if (page > 1) params.set("page", String(page));
  const suffix = params.toString();
  return suffix ? `${pathname}?${suffix}` : pathname;
}
export function catalogDescription(category?: string): string {
  return category
    ? `Взуття в категорії «${category}». Перегляньте моделі та ціни, оберіть розмір. Наявність і доступні розміри вказані у картці кожного товару.`
    : "";
}

// Next may expose encoded segments during one rendering phase and decoded ones
// during another. Normalize once before lookup and canonical URL comparison.
export function decodeRouteSegments(slug: string[]): string[] {
  return slug.map(segment => {
    try { return decodeURIComponent(segment); }
    catch { return segment; }
  });
}

export function filterHref(pathname: string, query: string, key: "brand" | "model" | "size", value: string): string {
  const params = new URLSearchParams(query);
  if (value) params.set(key, value); else params.delete(key);
  if (key === "brand") params.delete("model");
  params.delete("page");
  return params.size ? `${pathname}?${params}` : pathname;
}
