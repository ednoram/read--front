import { FC } from "react";

import styles from "./AuthForm.module.scss";

interface Props {
  type: "login" | "register";
}

const AuthForm: FC<Props> = ({ type }) => {
  const typeIsRegister = type === "register";

  return (
    <form className={styles.form}>
      <div className={styles.form__inputs}>
        {typeIsRegister && (
          <input placeholder="User Name" className={styles.form__text_input} />
        )}
        <input
          placeholder="Email address"
          className={styles.form__text_input}
        />
        <input
          type="password"
          placeholder="Password"
          className={styles.form__text_input}
        />
        {typeIsRegister && (
          <input
            type="password"
            placeholder="Confirm Password"
            className={styles.form__text_input}
          />
        )}
        <button className={styles.form__submit_button}>
          {typeIsRegister ? "Register" : "Log In"}
        </button>
      </div>
    </form>
  );
};

export default AuthForm;
