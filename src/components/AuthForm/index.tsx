import { useState, FC, FormEvent } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";

import { Loader } from "@components";
import { LOG_IN_MUTATION, REGISTER_MUTATION } from "@graphql";

import styles from "./AuthForm.module.scss";

interface Props {
  type: "login" | "register";
}

const INITIAL_STATE = {
  name: "",
  email: "",
  password: "",
  passwordConfirmation: "",
};

const AuthForm: FC<Props> = ({ type }) => {
  const typeIsRegister = type === "register";

  const [state, setState] = useState(INITIAL_STATE);
  const [submit, { loading, error }] = useMutation(
    typeIsRegister ? REGISTER_MUTATION : LOG_IN_MUTATION,
    {
      onError: () => {},
      onCompleted: () => {
        localStorage.setItem("isAuthenticated", "true");
        router.push("/");
      },
    }
  );

  const router = useRouter();

  const setStateProperty = (key: string, value: string) => {
    setState({ ...state, [key]: value });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { name, email, password, passwordConfirmation } = state;
    submit({ variables: { name, email, password, passwordConfirmation } });
  };

  const errorMessage = error?.graphQLErrors[0]?.message;

  const errorDiv = errorMessage && (
    <div className={styles.form__error_div}>
      <p>{errorMessage}</p>
    </div>
  );

  const loadingDiv = loading && (
    <div className={styles.form__loading_div}>
      <Loader />
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.form__inputs}>
        {errorDiv}
        {loadingDiv}
        {typeIsRegister && (
          <input
            placeholder="Name"
            className={styles.form__text_input}
            onChange={(e) => setStateProperty("name", e.target.value)}
          />
        )}
        <input
          type="email"
          value={state.email}
          placeholder="Email address"
          className={styles.form__text_input}
          onChange={(e) => setStateProperty("email", e.target.value)}
        />
        <input
          type="password"
          value={state.password}
          placeholder="Password"
          className={styles.form__text_input}
          onChange={(e) => setStateProperty("password", e.target.value.trim())}
        />
        {typeIsRegister && (
          <input
            type="password"
            placeholder="Confirm Password"
            className={styles.form__text_input}
            onChange={(e) =>
              setStateProperty("passwordConfirmation", e.target.value.trim())
            }
          />
        )}
        <button disabled={loading} className={styles.form__submit_button}>
          {typeIsRegister ? "Register" : "Log In"}
        </button>
      </div>
    </form>
  );
};

export default AuthForm;
