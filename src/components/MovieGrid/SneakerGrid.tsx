import type { Sneaker } from "../../types/sneaker";
import css from "./SneakerGrid.module.css";
import SneackerCard from "../SneackerCard/SneackerCard";

interface sneakerGridProps {
  onSelect: () => void;
  sneakers: Sneaker[];
}

export default function SneakerGrid({ sneakers, onSelect }: sneakerGridProps) {
  return (
    <ul className={css.wrap}>
      {sneakers.map((sneaker) => (
        <SneackerCard key={sneaker.id} sneaker={sneaker} onSelect={onSelect} />
      ))}
    </ul>
  );
}
