import SneakerClient from "@/components/SneakersClient/SneakerClient";
import CategorySelect from "@/components/Filters/CategorySelect";
import { fetchCategories, fetchSneackers } from "@/src/lib/api";
import PaginationButton from "@/components/Pagination/Pagination";
import SizeFilter from "@/components/Filters/SizeFilter";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import RecentlyViewed from "@/components/RecentlyViewed/RecentlyViewed";
import {
  CatalogQuery,
  categoryPath,
  catalogPageNumber,
  catalogPageHref,
  catalogDescription,
} from "@/src/lib/catalog-route";

interface PageProps {
  searchParams: Promise<CatalogQuery>;
  category?: string;
}

export async function catalogMetadata({
  searchParams,
  category,
}: PageProps): Promise<Metadata> {
  const { search, size, page } = await searchParams;
  const pageNumber = catalogPageNumber(page);
  let title = category ? `${category} — каталог взуття` : "Каталог кросівок";
  if (search) title = `Пошук «${search}»${category ? ` — ${category}` : ""}`;
  if (pageNumber > 1) title += ` — сторінка ${pageNumber}`;
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (size) params.set("size", size);
  const canonical = catalogPageHref(
    category ? categoryPath(category) : "/sneakers",
    params.toString(),
    pageNumber,
  );
  const description = catalogDescription(category);
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical },
    robots: { index: !search && !size, follow: true },
  };
}

export default async function CatalogPage({
  searchParams,
  category,
}: PageProps) {
  const { search, size, page } = await searchParams;
  const currentPage = catalogPageNumber(page);
  const [categories, data] = await Promise.all([
    fetchCategories(),
    fetchSneackers({
      search: search?.trim() || undefined,
      category,
      size: size?.trim() || undefined,
      page: currentPage,
    }),
  ]);
  if (currentPage > Math.max(1, data.totalPages)) notFound();
  return (
    <section>
      <CategorySelect categories={categories} current={category} />
      <h1>
        {search
          ? `Пошук «${search}»`
          : category
            ? `Взуття ${category}`
            : "Всі кросівки"}
      </h1>
      {currentPage === 1 && !search && <p>{catalogDescription(category)}</p>}
      <PaginationButton currentPage={data.page} totalPages={data.totalPages} />
      <SizeFilter />
      {data.products.length ? (
        <SneakerClient sneakers={data.products} />
      ) : (
        <p>За обраними умовами товарів не знайдено.</p>
      )}
      <PaginationButton currentPage={data.page} totalPages={data.totalPages} />
      <RecentlyViewed />
    </section>
  );
}
