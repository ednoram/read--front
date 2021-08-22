import { useState, useEffect, FC, FormEvent } from "react";
import { useMutation } from "@apollo/client";

import { useGetUser } from "@hooks";
import { Loader } from "@components";
import { MY_ACCOUNT_ROUTE } from "@constants";
import { UPDATE_USER_MUTATION } from "@graphql";
import {
  disableEnterSubmit,
  disableRouteChangeEvent,
  getGraphqlErrorMessage,
} from "@utils";

import styles from "./EditAccount.module.scss";

const Form: FC = () => {
  const [state, setState] = useState({ name: "", about: "" });
  const user = useGetUser();
  const [updateUser, { error, loading }] = useMutation(UPDATE_USER_MUTATION, {
    onError: () => {},
    onCompleted: () => {
      disableRouteChangeEvent();
      location.href = MY_ACCOUNT_ROUTE;
    },
  });

  useEffect(() => {
    if (user) {
      const { name, about } = user;
      setState({ name, about });
    }
  }, [user]);

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    window.scroll(0, 0);

    const { name, about } = state;
    updateUser({ variables: { name, about } });
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

  return (
    <form onSubmit={handleFormSubmit} className={styles.content__form}>
      {errorDiv}
      {loadingDiv}
      <ul className={styles.content__form_list}>
        <li>
          <label htmlFor="name">
            <p className={styles.content__label_text}>User Name:</p>
          </label>
          <input
            name="name"
            maxLength={30}
            value={state.name}
            autoComplete="off"
            placeholder="User Name"
            onKeyDown={disableEnterSubmit}
            className={styles.content__input}
            onChange={(e) => setState({ ...state, name: e.target.value })}
          />
        </li>
        <li>
          <label htmlFor="about">
            <p className={styles.content__label_text}>About:</p>
          </label>
          <textarea
            name="about"
            maxLength={400}
            placeholder="About"
            value={state.about}
            className={styles.content__about_textarea}
            onChange={(e) => setState({ ...state, about: e.target.value })}
          />
        </li>
        <li className="flex_center">
          <button className={styles.content__submit_button}>
            Submit Changes
          </button>
        </li>
      </ul>
    </form>
  );
};

export default Form;
