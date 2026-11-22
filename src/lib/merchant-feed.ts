import type { Sneaker } from "../../types/sneaker";
import { productPath } from "./product-route";
import sanitizeHtml from "sanitize-html";

const SITE = "https://krossava.com.ua";
export const xmlEscape = (value: unknown): string => String(value ?? "")
  .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\ufffe\uffff]/g, "")
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;").replace(/'/g, "&apos;");
const field = (name: string, value: unknown) => `<g:${name}>${xmlEscape(value)}</g:${name}>`;
const publicImage = (value: string) => {
  try { const url = new URL(value, SITE); return ["http:", "https:"].includes(url.protocol) ? url.href : ""; } catch { return ""; }
};

export function merchantFeed(products: Sneaker[]): string {
  const items: string[] = [];
  const seen = new Set<string>();
  for (const product of products) {
    const images = [...new Set([product.image, ...(product.images || [])].filter(Boolean).map(publicImage).filter(Boolean))];
    if (!product.id || !product.name || !images.length || !Number.isFinite(Number(product.price)) || Number(product.price) <= 0) {
      throw new Error("Invalid product in merchant catalogue");
    }
    const canonical = `${SITE}${productPath(product)}`;
    const description = sanitizeHtml(product.description || product.name, { allowedTags: [], allowedAttributes: {} }).replace(/&(amp|lt|gt|quot|apos|nbsp);/g, (_, entity: string) => ({ amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " }[entity] || ""))
      .replace(/\s+/g, " ").trim();
    for (const size of product.sizes) {
      if (!size.size || !Number.isFinite(size.quantity) || size.quantity < 0) throw new Error("Invalid size in merchant catalogue");
      const id = `${product.id}-${size.size}`;
      if (seen.has(id)) throw new Error("Duplicate merchant variant");
      seen.add(id);
      const url = new URL(canonical);
      url.searchParams.set("size", size.size);
      items.push(`<item>${[
        field("id", id), field("item_group_id", product.id),
        field("title", `${product.name} — розмір ${size.size}`.slice(0, 150)),
        field("description", description.slice(0, 5000)), field("link", url.href),
        field("canonical_link", canonical), field("image_link", images[0]),
        ...images.slice(1, 11).map(image => field("additional_image_link", image)),
        field("availability", size.quantity > 0 ? "in_stock" : "out_of_stock"),
        field("price", `${Number(product.price).toFixed(2)} UAH`), field("condition", "new"),
        field("google_product_category", "187"), field("product_type", "Взуття"),
        ...(product.brand ? [field("brand", product.brand)] : []),
        field("size", size.size),
      ].join("")}</item>`);
    }
  }
  if (!items.length) throw new Error("Empty merchant catalogue");
  return `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:g="http://base.google.com/ns/1.0"><channel><title>Krossava</title><link>${SITE}</link><description>Каталог взуття Krossava</description>${items.join("")}</channel></rss>`;
}
