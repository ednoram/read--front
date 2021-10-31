import { useState, FC } from "react";
import Link from "next/link";
import Image from "next/image";

import {
  LOGIN_ROUTE,
  USERS_ROUTE,
  POST_ARTICLE,
  ARTICLES_ROUTE,
  REGISTER_ROUTE,
  MY_ACCOUNT_ROUTE,
} from "@constants";
import { useIsAuthenticated, useControlScroll } from "@hooks";

import Hamburger from "./Hamburger";
import styles from "./Header.module.scss";
import NavigationLink from "./NavigationLink";

const Header: FC = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const isAuthenticated = useIsAuthenticated();

  useControlScroll(menuIsOpen, setMenuIsOpen);

  const authRelatedLinks = isAuthenticated ? (
    <>
      <li>
        <NavigationLink href={POST_ARTICLE} text="Post Article" />
      </li>
      <li>
        <NavigationLink href={MY_ACCOUNT_ROUTE} text="My Account" />
      </li>
    </>
  ) : (
    <>
      <li>
        <NavigationLink href={LOGIN_ROUTE} text="Log In" />
      </li>
      <li>
        <NavigationLink href={REGISTER_ROUTE} text="Register" />
      </li>
    </>
  );

  const navigation = (
    <nav>
      <ul className={styles.header__nav_list}>
        <li>
          <NavigationLink href="/" text="Home" />
        </li>
        <li>
          <NavigationLink href={ARTICLES_ROUTE} text="Articles" />
        </li>
        <li>
          <NavigationLink href={USERS_ROUTE} text="Users" />
        </li>
        {isAuthenticated !== null && authRelatedLinks}
      </ul>
    </nav>
  );

  const hamburger = (
    <div className={styles.header__hamburger}>
      <Hamburger menuIsOpen={menuIsOpen} setMenuIsOpen={setMenuIsOpen} />
      <div
        className={`${styles.header__hamburger_menu} ${
          menuIsOpen ? styles.header__hamburger_menu_open : ""
        }`}
      >
        {menuIsOpen && (
          <>
            <div className="flex_center">
              <Image width={64} height={64} src="/logo.svg" />
            </div>
            {navigation}
          </>
        )}
      </div>
    </div>
  );

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.header__content}>
          <div>
            <Link href="/">
              <a className={styles.header__logo}>
                <Image
                  src="/logo.svg"
                  width={48}
                  height={48}
                  className={styles.header__logo}
                />
                <p className={styles.header__logo_text}>Read</p>
              </a>
            </Link>
          </div>
          {navigation}
          {hamburger}
        </div>
      </div>
    </header>
  );
};

export default Header;
