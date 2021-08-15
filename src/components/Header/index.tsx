import { useState, FC } from "react";
import Link from "next/link";

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
      <NavigationLink href={POST_ARTICLE} text="Post Article">
        Log Out
      </NavigationLink>
      <NavigationLink href={MY_ACCOUNT_ROUTE} text="My Account">
        Log Out
      </NavigationLink>
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
            <p className={styles.header__hamburger_logo}>Read</p>
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
              <a className={styles.header__logo}>Read</a>
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
