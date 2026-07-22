import SneakerClient from "@/components/SneakersClient/SneakerClient";
import CategorySelect from "@/components/Filters/CategorySelect";
import { fetchCategories, fetchSneackers } from "@/src/lib/api";
import PaginationButton from "@/components/Pagination/Pagination";
import SizeFilter from "@/components/Filters/SizeFilter";

interface PageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    page?: string;
    size?: string;
  }>;
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
