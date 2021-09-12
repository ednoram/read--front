import { useState, FC, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";

import { Loader } from "@components";
import { LOGIN_ROUTE } from "@constants";
import { getGraphqlErrorMessage } from "@utils";
import { RESET_PASSWORD_ROUTE } from "@constants";
import { RESET_PASSWORD_MUTATION } from "@graphql";

import styles from "./ResetPassword.module.scss";

const Form: FC = () => {
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const router = useRouter();

  const [resetPassword, { loading, error, data }] = useMutation(
    RESET_PASSWORD_MUTATION,
    {
      onError: () => {},
      onCompleted: () => {
        setTimeout(() => router.push(LOGIN_ROUTE), 800);
      },
    }
  );

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const token = router.query.token;
    const userEmail = router.query.email;

    resetPassword({
      variables: {
        token,
        userEmail,
        newPassword,
        passwordConfirmation,
      },
    });
  };

  const loadingDiv = loading && (
    <div className="loading_div">
      <Loader />
    </div>
  );

  const errorMessage = getGraphqlErrorMessage(error);

  const errorDiv = errorMessage && (
    <div className="error_div">
      <p>{errorMessage}</p>
    </div>
  );

  const successDiv = data?.sendResetPasswordEmail && (
    <div className="success_div">
      <p>Email has been sent</p>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {errorDiv}
      {loadingDiv}
      {successDiv}
      <div className={styles.form__inputs}>
        <input
          type="password"
          autoComplete="off"
          value={newPassword}
          placeholder="New Password"
          className={styles.form__input}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          autoComplete="off"
          value={passwordConfirmation}
          className={styles.form__input}
          placeholder="Confirm New Password"
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
        <button className={styles.form__submit_button}>Set Password</button>
        <p>
          {`Didn't receive? `}
          <Link href={RESET_PASSWORD_ROUTE}>
            <a className="color_primary">Send Again</a>
          </Link>
        </p>
      </div>
    </form>
  );
};

export default Form;
