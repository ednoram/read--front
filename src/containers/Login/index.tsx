import { FC } from "react";
import Link from "next/link";

import { AuthForm } from "@components";
import { REGISTER_ROUTE, RESET_PASSWORD_ROUTE } from "@constants";

import styles from "./Login.module.scss";

const Login: FC = () => {
  const links = (
    <div className={styles.content__links}>
      <p className={styles.content__no_account_text}>
        Don&apos;t have an account?
      </p>
      <Link href={REGISTER_ROUTE}>
        <a>
          <button
            name="register page"
            className={styles.content__register_button}
          >
            Register
          </button>
        </a>
      </Link>
      <div>
        <Link href={RESET_PASSWORD_ROUTE}>
          <a className={styles.content__right_link}>Forgot password</a>
        </Link>
      </div>
      <div>
        <Link href="/">
          <a className={styles.content__right_link}>
            Continue without logging in
          </a>
        </Link>
      </div>
    </div>
  );

  const leftSide = (
    <div className={styles.content__left}>
      <h1 className="page_title">Log In</h1>
      <div className="container_small">
        <AuthForm type="login" />
      </div>
    </div>
  );

  const rightSide = (
    <div className={styles.content__right}>
      <div className="container flex_center">
        <p className={styles.content__logo}>Read</p>
        <p className={styles.content__description}>
          A place where you can learn and share your knowledge.
        </p>
        <div className={styles.responsive_hide}>{links}</div>
      </div>
    </div>
  );

  return (
    <div className={styles.content}>
      {leftSide}
      {rightSide}
      <div
        className={`${styles.content__responsive_links_div} ${styles.responsive_show}`}
      >
        <div className="container">{links}</div>
      </div>
    </div>
  );
};

export default Login;
