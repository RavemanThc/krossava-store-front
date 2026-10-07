import sanitizeHtml from "sanitize-html";
import type { Metadata } from "next";
import { Sneaker } from "@/types/sneaker";
import { productPath } from "@/src/lib/product-route";
import SneakerDetailsClient from "./SneakerDetails";
import RecentlyViewed from "@/components/RecentlyViewed/RecentlyViewed";

type Props = { sneaker: Sneaker };

export async function productMetadata({ sneaker }: Props): Promise<Metadata> {
  const image = sneaker.image.startsWith("http")
    ? sneaker.image
    : `https://krossava.com.ua${sneaker.image}`;

  return {
    title: `${sneaker.name} — купити в Україні`,
    description: `${sneaker.name}. Ціна ${sneaker.price} грн. Брендові кросівки з доставкою по Україні.`,

    keywords: [
      sneaker.name,
      sneaker.category,
      "купити кросівки",
      "брендові кросівки",
      "Krossava",
    ],

    alternates: {
      canonical: productPath(sneaker),
    },

    openGraph: {
      type: "website",
      url: `https://krossava.com.ua${productPath(sneaker)}`,
      title: `${sneaker.name} | Krossava`,
      description: `${sneaker.name}. Ціна ${sneaker.price} грн.`,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: sneaker.name,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `${sneaker.name} | Krossava`,
      description: `${sneaker.name}. ${sneaker.price} грн.`,
      images: [image],
    },
  };
}

export default function ProductPage({ sneaker }: Props) {

  const image = sneaker.image.startsWith("http")
    ? sneaker.image
    : `https://krossava.com.ua${sneaker.image}`;

  const product = {
    "@context": "https://schema.org",
    "@type": "Product",

    "@id": `https://krossava.com.ua${productPath(sneaker)}`,

    name: sneaker.name,
    image: [image],
    description: sneaker.description,

    sku: sneaker.barcode,

    category: sneaker.category,

    brand: {
      "@type": "Brand",
      name: sneaker.category,
    },

    offers: {
      "@type": "Offer",
      url: `https://krossava.com.ua${productPath(sneaker)}`,
      price: sneaker.price,
      priceCurrency: "UAH",
      availability: sneaker.sizes.some(size => size.quantity > 0)
        ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",

      priceValidUntil: "2027-12-31",

      seller: {
        "@type": "Organization",
        name: "Krossava",
      },
    },

    url: `https://krossava.com.ua${productPath(sneaker)}`,

    mainEntityOfPage: `https://krossava.com.ua${productPath(sneaker)}`,
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Головна",
        item: "https://krossava.com.ua",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Кросівки",
        item: "https://krossava.com.ua/sneakers",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: sneaker.name,
        item: `https://krossava.com.ua${productPath(sneaker)}`,
      },
    ],
  };
  return (
    <>
      <SneakerDetailsClient key={sneaker.id} sneaker={{ ...sneaker, description: sanitizeHtml(sneaker.description || "") }} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([product, breadcrumb]).replace(/</g, "\\u003c"),
        }}
      />
      <RecentlyViewed />
    </>
  );
}
