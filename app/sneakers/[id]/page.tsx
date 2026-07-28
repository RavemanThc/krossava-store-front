import type { Metadata } from "next";
import { fetchSneackersById } from "@/src/lib/api";
import SneakerDetailsClient from "./SneakerDetails";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const sneaker = await fetchSneackersById(id);

  const image = sneaker.image.startsWith("http")
    ? sneaker.image
    : `https://krossava.com.ua${sneaker.image}`;

  return {
    title: `${sneaker.name} — купити в Україні | Krossava`,
    description: `${sneaker.name}. Ціна ${sneaker.price} грн. Брендові кросівки з доставкою по Україні.`,

    keywords: [
      sneaker.name,
      sneaker.category,
      "купити кросівки",
      "брендові кросівки",
      "Krossava",
    ],

    alternates: {
      canonical: `/sneakers/${id}`,
    },

    openGraph: {
      type: "website",
      url: `https://krossava.com.ua/sneakers/${id}`,
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

export default async function SneakerDetails({ params }: Props) {
  const { id } = await params;
  const sneaker = await fetchSneackersById(id);

  const image = sneaker.image.startsWith("http")
    ? sneaker.image
    : `https://krossava.com.ua${sneaker.image}`;

  const product = {
    "@context": "https://schema.org",
    "@type": "Product",

    "@id": `https://krossava.com.ua/sneakers/${id}`,

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
      url: `https://krossava.com.ua/sneakers/${id}`,
      price: sneaker.price,
      priceCurrency: "UAH",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",

      priceValidUntil: "2027-12-31",

      seller: {
        "@type": "Organization",
        name: "Krossava",
      },
    },

    url: `https://krossava.com.ua/sneakers/${id}`,

    mainEntityOfPage: `https://krossava.com.ua/sneakers/${id}`,
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
        item: `https://krossava.com.ua/sneakers/${id}`,
      },
    ],
  };
  return (
    <>
      <SneakerDetailsClient sneaker={sneaker} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([product, breadcrumb]),
        }}
      />
    </>
  );
}
