import Image, { getImageProps } from "next/image";
import Link from "next/link";
import Herotopcategories from "./Herotopcategories";
import MainHero from "./MainHero";
import PromoGallery from "./PromoGallery";
import { promotions } from "./promotions";
import css from "./MainPage.module.css";

const sizes = "(max-width: 767px) 52vw, (max-width: 1023px) 42vw, (max-width: 1439px) 30vw, 320px";

const MainPage = () => (
  <>
    <PromoGallery>
      {promotions.map((promo, index) => (
        <li key={promo.id} className={css.storyGalleryItem}>
          <Link href={promo.href} className={css.promoLink}>
            <picture>
              {promo.mobile && (
                <source media="(max-width: 767px)" width={promo.mobile.width} height={promo.mobile.height}
                  sizes={sizes} srcSet={getImageProps({ ...promo.mobile, alt: promo.alt, sizes }).props.srcSet} />
              )}
              <Image {...promo.desktop} alt={promo.alt} sizes={sizes}
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"} />
            </picture>
            <span className={css.promoCaption}>{promo.title}<span aria-hidden="true">↗</span></span>
          </Link>
        </li>
      ))}
    </PromoGallery>
    <MainHero />
    <Herotopcategories />
  </>
);
export default MainPage;
