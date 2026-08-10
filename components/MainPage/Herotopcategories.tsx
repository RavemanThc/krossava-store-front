import Image from "next/image";
import css from "./MainPage.module.css";
import Link from "next/link";
const Herotopcategories = () => {
  return (
    <section className={css.topcategories}>
      <nav className={css.topcategorieswrap}>
        <ul className={css.topcategorieListswrap}>
          <li>
            <Link
              href={`/sneakers?search=Adidas`}
              className={css.topcategorieswrapList}
            >
              <Image
                className={css.HeroCategoriesImage}
                src="/heroimages/adidashero.webp"
                alt="Hero adidas"
                width={670}
                height={400}
              />
              <h2 className={css.topcategorieswrapSubTitle}>Adidas</h2>
            </Link>{" "}
          </li>
          <li>
            <Link
              href={`/sneakers?search=Nike`}
              className={css.topcategorieswrapList}
            >
              <Image
                className={css.HeroCategoriesImage}
                src="/heroimages/nikehero.webp"
                alt="Hero nike"
                width={670}
                height={400}
              />
              <h2 className={css.topcategorieswrapSubTitle}>Nike</h2>
            </Link>
          </li>
          <li>
            <Link
              href={`/sneakers?search=Asics`}
              className={css.topcategorieswrapList}
            >
              <Image
                className={css.HeroCategoriesImage}
                src="/heroimages/asicshero.webp"
                alt="Hero asics"
                width={670}
                height={400}
              />
              <h2 className={css.topcategorieswrapSubTitle}>Asics</h2>
            </Link>
          </li>
          <li>
            <Link
              href={`/sneakers?search=New+Balance`}
              className={css.topcategorieswrapList}
            >
              <Image
                className={css.HeroCategoriesImage}
                src="/heroimages/nbhero.webp"
                alt="Hero New Balance"
                width={670}
                height={400}
              />
              <h2 className={css.topcategorieswrapSubTitle}>New Balance</h2>
            </Link>
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default Herotopcategories;
