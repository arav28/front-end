import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { getImageUrl } from "../utils";
import { FaSearch } from "react-icons/fa";

export const Navbar = () => {
  const [menuDraw, setMenuDraw] = useState(false);
  return (
    <nav className={styles.navbar}>
      <a className={styles.title} href="/">
        Rental Service App
      </a>
      <form className={styles.form}>
        <input
          type="text"
          placeholder="Search items..."
          className={styles.inputbar}
        />
        <button className="text-white text-lg bg-transparent">
          <FaSearch/>
        </button>
      </form>
      <div className={styles.menu}>
        <img
          className={styles.menuBtn}
          src={
            menuDraw
              ? getImageUrl("nav/closeIcon.png")
              : getImageUrl("nav/menuIcon.png")
          }
          alt="Menu Icon"
          onClick={() => setMenuDraw(!menuDraw)}
        />
        <ul
          className={`${styles.menuItems} ${menuDraw && styles.menuOpen}`}
          onClick={() => setMenuDraw(false)}
        >
          <li>
            <a href="#Home"> Home </a>
          </li>
          <li>
            <a href="#About"> About </a>
          </li>
          <li>
            <a href="sign-up"> Register </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
