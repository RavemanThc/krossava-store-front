import type { Sneaker } from "../../../../types/sneaker";
import css from "./SneakerGrid.module.css";
import SneackerCard from "../SneackerCard/SneackerCard";

interface sneakerGridProps {
  onSelect: (sneaker: Sneaker, size: string) => void;
  sneakers: Sneaker[];
  onModal: (sneaker: Sneaker) => void;
}

export default function SneakerGrid({
  sneakers,
  onSelect,
  onModal,
}: sneakerGridProps) {
  return (
    <ul className={css.wrap}>
      {sneakers.map((sneaker) => (
        <SneackerCard
          key={sneaker.id}
          sneaker={sneaker}
          onSelect={onSelect}
          onModal={onModal}
        />
      ))}
    </ul>
  );
}
