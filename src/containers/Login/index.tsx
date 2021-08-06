import { FC } from "react";
import Link from "next/link";

import { AuthForm } from "@components";
import { REGISTER_ROUTE } from "@constants";

import styles from "./Login.module.scss";

const Login: FC = () => {
  const leftSide = (
    <div className={styles.content__left}>
      <h1 className={styles.content__title}>Log In</h1>
      <AuthForm type="login" />
    </div>
  );

  const rightSide = (
    <div className={styles.content__right}>
      <div className="flex_center">
        <p className={styles.content__logo}>Read</p>
        <p className={styles.content__description}>
          A place to learn and share your knowledge.
        </p>
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
        <Link href={"/"}>
          <a className={styles.content__continue_link}>
            Continue without logging in
          </a>
        </Link>
      </div>
    </div>
  );

  return (
    <div className={styles.content}>
      {leftSide}
      {rightSide}
    </div>
  );
};

export default Login;
