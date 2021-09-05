import {
  useState,
  FC,
  FormEvent,
  SetStateAction,
  Dispatch,
  useEffect,
} from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";

import {
  LOG_IN_MUTATION,
  REGISTER_MUTATION,
  VERIFY_ACCOUNT_MUTATION,
} from "@graphql";
import { Loader } from "@components";
import { getGraphqlErrorMessage } from "@utils";
import { LOGIN_ROUTE, MY_ACCOUNT_ROUTE } from "@constants";

import styles from "./AuthForm.module.scss";

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

  const [
    submitVerification,
    { loading: loadingVerification, error: verificationError },
  ] = useMutation(VERIFY_ACCOUNT_MUTATION, {
    onError: () => {},
    onCompleted: () => {
      if (typeIsVerification) {
        router.push(LOGIN_ROUTE);
      }
    },
  });

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

  const handleVerificationSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitVerification({
      variables: { userEmail: email, code: state.code },
    });
  };

  const errorMessage = getGraphqlErrorMessage(error || verificationError);

  const errorDiv = errorMessage && (
    <div className="error_div">
      <p>{errorMessage}</p>
    </div>
  );

  const loadingDiv = (loading || loadingVerification) && (
    <div className="loading_div">
      <Loader />
    </div>
  );

  const verificationForm = (
    <form onSubmit={handleVerificationSubmit} className={styles.form}>
      {errorDiv}
      {loadingDiv}
      <div className={styles.form__inputs}>
        <p className={styles.form__verification_message}>
          Please check your inbox and enter the four digit verification code to
          verify your account.
        </p>
        <input
          value={state.code}
          placeholder="Verification Code"
          className={styles.form__text_input}
          onChange={(e) => setStateProperty("code", e.target.value)}
        />
        <button
          disabled={loadingVerification}
          className={styles.form__submit_button}
        >
          Submit
        </button>
      </div>
    </form>
  );

  return typeIsVerification ? (
    verificationForm
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
