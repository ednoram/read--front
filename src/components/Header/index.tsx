import { FC } from "react";
import Link from "next/link";

import { LOGIN_ROUTE, REGISTER_ROUTE } from "@constants";

import styles from "./Header.module.scss";
import NavigationLink from "./NavigationLink";

const Header: FC = () => {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.header__content}>
          <div>
            <Link href="/">
              <a className={styles.header__logo}>Read</a>
            </Link>
          </div>
          <nav>
            <ul className={styles.header__nav_list}>
              <li>
                <NavigationLink href="/" text="Home" />
              </li>
              <li>
                <NavigationLink href={LOGIN_ROUTE} text="Log In" />
              </li>
              <li>
                <NavigationLink href={REGISTER_ROUTE} text="Register" />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
