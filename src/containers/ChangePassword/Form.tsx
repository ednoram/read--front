import { useState, FC, FormEvent } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";

import { Loader } from "@components";
import { MY_ACCOUNT_ROUTE } from "@constants";
import { disableRouteChangeEvent } from "@utils";
import { CHANGE_PASSWORD_MUTATION } from "@graphql";

import styles from "./ChangePassword.module.scss";

const INITIAL_STATE = {
  newPassword: "",
  currentPassword: "",
  passwordConfirmation: "",
};

type StatePropertyType =
  | "newPassword"
  | "currentPassword"
  | "passwordConfirmation";

const Form: FC = () => {
  const [state, setState] = useState(INITIAL_STATE);
  const router = useRouter();

  const [changeUserPassword, { loading, error }] = useMutation(
    CHANGE_PASSWORD_MUTATION,
    {
      onError: () => {},
      onCompleted: () => {
        disableRouteChangeEvent();
        router.push(MY_ACCOUNT_ROUTE);
      },
    }
  );

  const changeStateProperty = (property: StatePropertyType, value: string) => {
    setState({ ...state, [property]: value });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    changeUserPassword({ variables: state });
  };

  const graphQLErrors = error?.graphQLErrors;
  const errorMessage = graphQLErrors && graphQLErrors[0]?.message;

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

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {errorDiv}
      {loadingDiv}
      <ul>
        <li>
          <label htmlFor="current_password">
            <p className={styles.form__label_text}>Current Password:</p>
          </label>
          <input
            type="password"
            name="current_password"
            value={state.currentPassword}
            placeholder="Current Password"
            onChange={(e) =>
              changeStateProperty("currentPassword", e.target.value)
            }
          />
        </li>
        <li>
          <label htmlFor="new_password">
            <p className={styles.form__label_text}>New Password:</p>
          </label>
          <input
            type="password"
            name="new_password"
            value={state.newPassword}
            placeholder="New Password"
            onChange={(e) => changeStateProperty("newPassword", e.target.value)}
          />
        </li>
        <li>
          <label htmlFor="confirm_new_password">
            <p className={styles.form__label_text}>Confirm New Password:</p>
          </label>
          <input
            type="password"
            name="confirm_new_password"
            placeholder="Confirm New Password"
            value={state.passwordConfirmation}
            onChange={(e) =>
              changeStateProperty("passwordConfirmation", e.target.value)
            }
          />
        </li>
        <li className="flex_center">
          <button className={styles.form__submit_button}>
            Change Password
          </button>
        </li>
      </ul>
    </form>
  );
};

export default Form;
