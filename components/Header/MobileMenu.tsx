"use client";

import { useEffect, useState } from "react";
import { TiThMenu } from "react-icons/ti";

import Navigation from "./Navigation";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import css from "./Header.module.css";
export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [isOpen]);
  return (
    <div className={css.mobileMenu}>
      <div className={css.mobwrap}>
        <Logo />
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open menu"
          className={css.buttonmenu}
        >
          <TiThMenu className={css.icon} />
        </button>
        <div className={`${css.mobMenu} ${isOpen ? css.open : ""}`}>
          <Navigation onNavigate={() => setIsOpen(false)} />
        </div>
      </div>
      <SearchBar />
    </div>
  );
}
