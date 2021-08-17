import { FC } from "react";
import Link from "next/link";

import { AuthForm } from "@components";
import { LOGIN_ROUTE } from "@constants";

import styles from "./Register.module.scss";

const Register: FC = () => {
  const links = (
    <div className={styles.content__links}>
      <p className={styles.content__have_account}>Already have an account?</p>
      <Link href={LOGIN_ROUTE}>
        <a>
          <button className={styles.content__login_button}>Log In</button>
        </a>
      </Link>
      <Link href={"/"}>
        <a className={styles.content__continue_link}>
          Continue without an account
        </a>
      </Link>
    </div>
  );

  const leftSide = (
    <div className={styles.content__left}>
      <div className="flex_center">
        <p className={styles.content__logo}>Read</p>
        <p className={styles.content__description}>
          A place to learn and share your knowledge.
        </p>
        <div className={styles.responsive_hide}>{links}</div>
      </div>
    </div>
  );

  const rightSide = (
    <div className={styles.content__right}>
      <h1 className="page_title">Register</h1>
      <div className="container_small">
        <AuthForm type="register" />
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

export default Register;
