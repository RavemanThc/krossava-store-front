"use client";
import { productPath } from "@/src/lib/product-route";


import SneakerGrid from "@/components/SneackerGrid/SneakerGrid";
import { Sneaker } from "@/types/sneaker";
import { useRouter } from "next/navigation";

export default function SneakerClient({ sneakers }: { sneakers: Sneaker[] }) {
  const router = useRouter();

  return (
    <>
      <SneakerGrid sneakers={sneakers} onSelect={(sneaker) => router.push(productPath(sneaker))} />
    </>
  );
}
