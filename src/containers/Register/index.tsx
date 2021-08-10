import { FC } from "react";
import Link from "next/link";

import { AuthForm } from "@components";
import { LOGIN_ROUTE } from "@constants";

import styles from "./Register.module.scss";

const Register: FC = () => {
  const leftSide = (
    <div className={styles.content__left}>
      <div className="flex_center">
        <p className={styles.content__logo}>Read</p>
        <p className={styles.content__description}>
          A place to learn and share your knowledge.
        </p>
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
    </div>
  );

  const rightSide = (
    <div className={styles.content__right}>
      <h1 className="page_title">Register</h1>
      <AuthForm type="register" />
    </div>
  );

  return (
    <div className={styles.content}>
      {leftSide}
      {rightSide}
    </div>
  );
};

export default Register;
