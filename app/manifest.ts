import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Krossava — Кросівки Nike, Adidas, New Balance",
    short_name: "Krossava",
    description:
      "Інтернет-магазин кросівок Nike, Adidas, New Balance та інших брендів.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    orientation: "portrait",
    lang: "uk",
    icons: [
      {
        src: "/Logo.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/Logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
