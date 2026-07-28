import { MetadataRoute } from "next";

const SITE_URL = "https://krossava.com.ua";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${SITE_URL}/sneakers`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];
}
