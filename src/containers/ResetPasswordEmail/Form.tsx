import { useState, FC, FormEvent } from "react";
import { useMutation } from "@apollo/client";

import { Loader } from "@components";
import { getGraphqlErrorMessage } from "@utils";
import { SEND_PASSWORD_EMAIL_MUTATION } from "@graphql";

import styles from "./ResetPassword.module.scss";

const Form: FC = () => {
  const [email, setEmail] = useState("");

  const [sendEmail, { loading, error, data }] = useMutation(
    SEND_PASSWORD_EMAIL_MUTATION,
    { onError: () => {} }
  );

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!email) {
      alert("Email address is required");
      return;
    }

    sendEmail({ variables: { userEmail: email } });
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
          type="email"
          value={email}
          autoComplete="off"
          placeholder="Email address"
          className={styles.form__input}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button disabled={loading} className={styles.form__submit_button}>
          Send Email
        </button>
      </div>
    </form>
  );
};

export default Form;
