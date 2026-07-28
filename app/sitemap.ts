import { fetchSneackers } from "@/src/lib/api";
import type { MetadataRoute } from "next";

const SITE_URL = "https://krossava.com.ua/";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { products } = await fetchSneackers({
    page: 1,
    perPage: 5000,
  });

  const sitemapProducts = products.map((product) => ({
    url: `${SITE_URL}/sneakers/${product.id}`,
    lastModified: new Date(),
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
    ...sitemapProducts,
  ];
}
