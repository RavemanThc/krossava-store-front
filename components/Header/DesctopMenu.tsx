import Logo from "./Logo";
import Navigation from "./Navigation";
import SearchBar from "./SearchBar";
import css from "./Header.module.css";
export default function DesctopMenu() {
  return (
    <div className={css.desctopMenu}>
      <Logo />
      <Navigation />
      <SearchBar />
    </div>
  );
}
