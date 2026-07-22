import MainHero from "./MainHero";
import css from "./MainPage.module.css";

const MainPage = () => {
  return (
    <section className={css.mainWrap}>
      <MainHero />{" "}
    </section>
  );
};
export default MainPage;
