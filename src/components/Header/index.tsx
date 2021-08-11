import { FC } from "react";
import Link from "next/link";

import {
  LOGIN_ROUTE,
  POST_ARTICLE,
  ARTICLES_ROUTE,
  REGISTER_ROUTE,
  MY_ACCOUNT_ROUTE,
} from "@constants";
import { useIsAuthenticated } from "@hooks";

import styles from "./Header.module.scss";
import NavigationLink from "./NavigationLink";

const Header: FC = () => {
  const isAuthenticated = useIsAuthenticated();

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
        {isAuthenticated !== null && authRelatedLinks}
      </ul>
    </nav>
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
        </div>
      </div>
    </header>
  );
};

export default Header;
