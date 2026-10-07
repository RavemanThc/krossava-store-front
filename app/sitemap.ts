import { productPath } from "@/src/lib/product-route";
import { categoryPath } from "@/src/lib/catalog-route";
import { api, fetchCategories } from "@/src/lib/api";
import type { AxiosResponse } from "axios";
import type { MetadataRoute } from "next";

const SITE_URL = "https://krossava.com.ua";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const categories = await fetchCategories();
  const products: { id: string; name: string; updatedAt?: string }[] = [];
  let after: string | null = null;
  do {
    const response: AxiosResponse<{
      products: { id: string; name: string; updatedAt?: string }[];
      nextCursor: string | null;
    }> = await api.get<{
      products: { id: string; name: string; updatedAt?: string }[];
      nextCursor: string | null;
    }>("/sitemap-products", { params: after ? { after } : {} });
    products.push(...response.data.products);
    after = response.data.nextCursor;
  } while (after);

  const sitemapProducts = products.map((product) => ({
    url: `${SITE_URL}${productPath(product)}`,
    // Подставляем реальную дату изменения товара из базы данных
    lastModified: product.updatedAt ? new Date(product.updatedAt) : new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: `${SITE_URL}/sneakers`,
      lastModified: new Date(),
      priority: 0.9,
    },
    ...categories.map(category => ({ url: `${SITE_URL}${categoryPath(category)}`, changeFrequency: "weekly" as const, priority: 0.8 })),
    ...sitemapProducts,
  ];
}
