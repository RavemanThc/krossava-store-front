import { cache } from "react";
import { notFound, permanentRedirect } from "next/navigation";
import { isAxiosError } from "axios";
import type { Metadata } from "next";
import CatalogPage, { catalogMetadata } from "@/components/Catalog/CatalogPage";
import ProductPage, { productMetadata } from "@/components/Catalog/ProductPage";
import { fetchCategories, fetchSneackersById } from "@/src/lib/api";
import { productIdFromSlug, productPath } from "@/src/lib/product-route";

import { categoryPath, categorySlug } from "@/src/lib/catalog-route";

type Props = {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<{ search?: string; category?: string; size?: string; page?: string }>;
};

const getProduct = cache(async (id: string) => {
  try {
    const product = await fetchSneackersById(id);
    if (!product) notFound();
    return product;
  } catch (error) {
    if (isAxiosError(error) && [400, 404].includes(error.response?.status ?? 0)) notFound();
    throw error;
  }
});

async function resolveProduct(slug: string[]) {
  const id = productIdFromSlug(slug);
  if (!id) notFound();
  const product = await getProduct(id);
  const canonical = productPath(product);
  const requested = `/sneakers/${slug.map(encodeURIComponent).join("/")}`;
  if (requested !== canonical) permanentRedirect(canonical);
  return product;
}

const getCategories = cache(fetchCategories);

async function resolveCategory(slug: string[], query: Awaited<Props["searchParams"]>) {
  if (slug.length > 1) notFound();
  if (!slug.length && !query.category) return undefined;
  const categories = await getCategories();
  const category = slug.length
    ? categories.find(name => categorySlug(name) === slug[0].toLowerCase())
    : categories.find(name => name === query.category);
  if (!category) notFound();
  const path = categoryPath(category);
  if (!slug.length || `/sneakers/${encodeURIComponent(slug[0])}` !== path || query.category) {
    const params = new URLSearchParams();
    for (const key of ["search", "size", "page"] as const) {
      if (query[key]) params.set(key, query[key]);
    }
    permanentRedirect(params.size ? `${path}?${params}` : path);
  }
  return category;
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { slug = [] } = await params;
  if (productIdFromSlug(slug)) return productMetadata({ sneaker: await resolveProduct(slug) });
  const category = await resolveCategory(slug, await searchParams);
  return catalogMetadata({ searchParams, category });
}

export default async function SneakersRoute({ params, searchParams }: Props) {
  const { slug = [] } = await params;
  if (productIdFromSlug(slug)) return <ProductPage sneaker={await resolveProduct(slug)} />;
  const category = await resolveCategory(slug, await searchParams);
  return <CatalogPage searchParams={searchParams} category={category} />;
}
