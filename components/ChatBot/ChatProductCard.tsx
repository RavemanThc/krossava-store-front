import { ChatProduct } from "@/types/  chat";
import Image from "next/image";
import Link from "next/link";
import css from "./ChatBot.module.css";
interface Props {
  product: ChatProduct;
}

const ChatProductCard = ({ product }: Props) => {
  return (
    <Link href={product.url} className={css.productLink}>
      <article className={css.productLink}>
        {product.image && (
          <Image
            className={css.ProductItemImage}
            src={product.image}
            alt={product.name}
            width={100}
            height={100}
          />
        )}

        <div className={css.ProductDescription}>
          <h4>{product.name}</h4>

          <p>{product.price} грн</p>

          {product.color && <p>Колір: {product.color}</p>}

          {product.sizeText && <p>Розмір: {product.sizeText}</p>}
        </div>
      </article>
    </Link>
  );
};

export default ChatProductCard;
