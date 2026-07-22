import { Sneaker } from "@/types/sneaker";
import SneackerItem from "../SneakerItem/SneackerItem";
import css from "./SneakerGrid.module.css";

interface sneakerGridProps {
  onSelect: (sneaker: Sneaker, size: string) => void;
  sneakers: Sneaker[];
}

export default function SneakerGrid({ sneakers, onSelect }: sneakerGridProps) {
  return (
    <ul className={css.wrap}>
      {sneakers.map((sneaker) => (
        <SneackerItem key={sneaker.id} sneaker={sneaker} onSelect={onSelect} />
      ))}
    </ul>
  );
}
