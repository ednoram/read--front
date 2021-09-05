import {
  FC,
  useState,
  Dispatch,
  useEffect,
  FormEvent,
  SetStateAction,
} from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";

import { Loader } from "@components";
import { MY_ACCOUNT_ROUTE } from "@constants";
import { getGraphqlErrorMessage } from "@utils";
import { LOG_IN_MUTATION, REGISTER_MUTATION } from "@graphql";

import styles from "./AuthForm.module.scss";
import VerificationForm from "./VerificationForm";

interface Props {
  email?: string;
  setStep?: Dispatch<SetStateAction<1 | 2>>;
  setEmail?: Dispatch<SetStateAction<string>>;
  type: "login" | "register" | "verification";
}

const INITIAL_STATE = {
  name: "",
  code: "",
  email: "",
  password: "",
  passwordConfirmation: "",
};

const AuthForm: FC<Props> = ({ type, setStep, email, setEmail }) => {
  const [state, setState] = useState(INITIAL_STATE);

  const typeIsLogin = type === "login";
  const typeIsRegister = type === "register";
  const typeIsVerification = type === "verification";

  const [submit, { loading, error }] = useMutation(
    typeIsRegister ? REGISTER_MUTATION : LOG_IN_MUTATION,
    {
      onError: () => {},
      onCompleted: () => {
        if (typeIsLogin) {
          localStorage.setItem("isAuthenticated", "true");
          router.push(MY_ACCOUNT_ROUTE);
        } else if (typeIsRegister && setStep) {
          setStep(2);
        }
      },
    }
  );

  const router = useRouter();

  useEffect(() => {
    if (setEmail) {
      setEmail(state.email);
    }
  }, [state.email]);

  const setStateProperty = (key: string, value: string) => {
    setState({ ...state, [key]: value });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submit({ variables: state });
  };

  const errorMessage = getGraphqlErrorMessage(error);

  const errorDiv = errorMessage && (
    <div className="error_div">
      <p>{errorMessage}</p>
    </div>
  );

  const loadingDiv = loading && (
    <div className="loading_div">
      <Loader />
    </div>
  );

  return typeIsVerification ? (
    <VerificationForm email={String(email)} />
  ) : (
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
          {typeIsLogin && "Log In"}
          {typeIsRegister && "Register"}
        </button>
      </div>
    </form>
  );
};

export default AuthForm;
