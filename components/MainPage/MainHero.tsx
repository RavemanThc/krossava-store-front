import Image from "next/image";
import css from "./MainPage.module.css";

const MainHero = () => {
  return (
    <section className={css.HeroWrap}>
      {" "}
      <div className={css.HerosubWrap}>
        <div className={css.titleWrap}>
          <h1 className={css.title}>Кросівки на будьякий смак</h1>
          <h2 className={css.subtitle}>Купуй стильно і не дорого</h2>
        </div>

        <Image
          className={css.HeroImage}
          src="/Heroimg.webp"
          alt="HeroSneaker"
          width={670}
          height={400}
        />
      </div>
    </section>
  );
};

export default MainHero;
