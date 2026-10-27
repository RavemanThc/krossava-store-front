import Link from "next/link";
import Herotopcategories from "./Herotopcategories";
import MainHero from "./MainHero";
import css from "./MainPage.module.css";

const MainPage = () => {
  return (
    <>
      <div className={css.heroPromo}>
        <Link href="/sneakers/зима">
          <picture>
            <source
              media="(max-width: 767px)"
              srcSet="/Notification_photo/winter_2026/winter_promo_mob.webp 1x,
               /Notification_photo/winter_2026/winter_promo_mob_x2.webp 2x

              "
            />
            <source
              media="(min-width: 768px)"
              srcSet="/Notification_photo/winter_2026/winter_promo_pc.webp 1x,
               /Notification_photo/winter_2026/winter_promo_pc_x2.webp 2x"
            />
            <img
              src="/Notification_photo/winter_2026/winter_promo_pc_x2.webp"
              alt="Зимова колекція Krossava"
              width="2000"
              height="802"
              fetchPriority="high"
            />
          </picture>
        </Link>
      </div>
      <MainHero />
      <Herotopcategories />
    </>
  );
};
export default MainPage;
