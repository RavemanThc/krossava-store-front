"use client";

import SneakerGrid from "@/components/SneackerGrid/SneakerGrid";
import { Sneaker } from "@/types/sneaker";
import { useState } from "react";

export default function SneakerClient({ sneakers }: { sneakers: Sneaker[] }) {
  const [selected, setSelected] = useState<Sneaker | null>(null);

  return (
    <>
      <SneakerGrid
        sneakers={sneakers}
        onSelect={(sneaker, size) => {
          console.log("add to cart", sneaker, size);
        }}
      />
    </>
  );
}
