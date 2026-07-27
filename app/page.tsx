import MainPage from "@/components/MainPage/MainPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://krossava.com.ua"),

  title: "Krossava — Купити кросівки | Nike, Adidas, New Balance",
  description:
    "Інтернет-магазин Krossava. Купуйте кросівки Nike, Adidas, New Balance та інших брендів. Великий вибір моделей, швидка доставка по всій Україні та доступні ціни.",

  keywords: [
    "кросівки",
    "купити кросівки",
    "кросівки Україна",
    "Nike",
    "Adidas",
    "New Balance",
    "Puma",
    "Asics",
    "чоловічі кросівки",
    "жіночі кросівки",
    "інтернет-магазин кросівок",
    "Krossava",
  ],

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Krossava — Купити кросівки в Україні",
    description:
      "Кросівки від популярних брендів. Швидка доставка по Україні. Великий вибір моделей та розмірів.",
    url: "https://krossava.com.ua",
    siteName: "Krossava",
    locale: "uk_UA",
    type: "website",
    images: [
      {
        url: "/Heroimg.webp",
        width: 1200,
        height: 630,
        alt: "Krossava — Інтернет-магазин кросівок",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Krossava — Купити кросівки",
    description: "Кросівки Nike, Adidas, New Balance та інших брендів.",
    images: ["/Heroimg.webp"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
};

const Home = () => {
  return <MainPage />;
};

export default Home;
