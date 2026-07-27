import SneakerClient from "@/components/SneakersClient/SneakerClient";
import CategorySelect from "@/components/Filters/CategorySelect";
import { fetchCategories, fetchSneackers } from "@/src/lib/api";
import PaginationButton from "@/components/Pagination/Pagination";
import SizeFilter from "@/components/Filters/SizeFilter";

import type { Metadata } from "next";

interface PageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    size?: string;
    page?: string;
  }>;
}

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const { search, category, size, page } = await searchParams;

  let title = "Каталог кросівок | Krossava";
  let description = "Каталог брендових кросівок з доставкою по Україні.";

  if (category) {
    title = `${category} — купити кросівки | Krossava`;
    description = `Категорія ${category}. Великий вибір моделей з доставкою по Україні.`;
  }

  if (search) {
    title = `"${search}" — пошук кросівок | Krossava`;
    description = `Результати пошуку "${search}" в магазині Krossava.`;
  }

  return {
    title,
    description,
    alternates: {
      canonical: `/sneakers?page=${page ?? 1}`,
    },
  };
}

export default async function Sneakers({ searchParams }: PageProps) {
  const { search, category, size, page } = await searchParams;
  const currentPage = Number(page || 1);

  const [categories, data] = await Promise.all([
    fetchCategories(),
    fetchSneackers({
      search: search?.trim() || undefined,
      category: category?.trim() || undefined,
      size: size?.trim() || undefined,
      page: currentPage,
    }),
  ]);

  return (
    <section>
      <CategorySelect categories={categories} />
      <PaginationButton currentPage={data.page} totalPages={data.totalPages} />
      <SizeFilter />
      <SneakerClient sneakers={data.products} />
      <PaginationButton currentPage={data.page} totalPages={data.totalPages} />
    </section>
  );
}
