import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_next/image", "/*?search="],
    },
    sitemap: "https://krossava.com.ua/sitemap.xml",
  };
}
