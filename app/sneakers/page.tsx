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
  let description = "Каталог брендових кросівок з доставкою по Україні | Adidas, Nike, New Balance. ";

  if (category) {
    title = `${category} — купити кросівки | Krossava`;
    description = `Категорія ${category}. Великий вибір моделей з доставкою по Україні.`;
  }

  if (search) {
    title = `"${search}" — пошук кросівок | Krossava`;
    description = `Результати пошуку "${search}" в магазині Krossava.`;
  }

  const params = new URLSearchParams();

  if (search) params.set("search", search);
  if (category) params.set("category", category);
  if (size) params.set("size", size);

  // page=1 не добавляем
  if (page && page !== "1") {
    params.set("page", page);
  }

  const canonical = params.toString()
    ? `/sneakers?${params.toString()}`
    : "/sneakers";

  return {
    title,
    description,
    alternates: {
      canonical,
    },
  };
}

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
