type ProductIdentity = { id: string; name?: string; title?: string };

export const productPath = (product: ProductIdentity): string => {
  const name = (product.name || product.title || "product")
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 100)
    .replace(/-+$/g, "") || "product";
  return `/sneakers/${encodeURIComponent(name)}-${product.id.toLowerCase()}`;
};

// The ID remains stable even if a product is renamed. Extra path segments are invalid.
export const productIdFromSlug = (slug: string[]): string | null => {
  if (slug.length !== 1) return null;
  const match = slug[0].match(/^(?:.+-)?([a-f0-9]{24})$/i);
  return match?.[1].toLowerCase() ?? null;
};
