import type { Sneaker } from "@/types/sneaker";
import { productPath } from "@/src/lib/product-route";

type Props = {
  sneaker: Sneaker;
};

const SITE_URL = "https://krossava.com.ua";

export default function ProductJsonLd({ sneaker }: Props) {
  const url = new URL(productPath(sneaker), SITE_URL).href;

  const images = [sneaker.image, ...(sneaker.images ?? [])]
    .filter((image): image is string => Boolean(image))
    .map((image) => new URL(image, SITE_URL).href);

  const available = sneaker.sizes.some((item) => item.quantity > 0);

  const description = (sneaker.description ?? "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}#product`,
    name: sneaker.name,
    image: [...new Set(images)],
    description,
    sku: sneaker.barcode || sneaker.id,
    category: sneaker.category,
    url,
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: "UAH",
      price: Number(sneaker.price),
      availability: available
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "Krossava",
        url: SITE_URL,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(productSchema).replace(/</g, "\\u003c"),
      }}
    />
  );
}
