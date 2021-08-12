import { useState, useEffect, FC, FormEvent } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";

import {
  POST_ARTICLE_MUTATION,
  UPDATE_ARTICLE_MUTATION,
  DELETE_ARTICLE_MUTATION,
} from "@graphql";
import { IArticle } from "@types";
import { Loader } from "@components";
import { ARTICLES_ROUTE } from "@constants";
import { disableRouteChangeEvent } from "@utils";

import styles from "./ArticleForm.module.scss";

interface Props {
  article?: IArticle;
}

const ArticleForm: FC<Props> = ({ article }) => {
  const [state, setState] = useState({
    body: article?.body || "",
    title: article?.title || "",
  });
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [submit, { error: errorSubmit, loading: loadingSubmit }] = useMutation(
    article ? UPDATE_ARTICLE_MUTATION : POST_ARTICLE_MUTATION,
    {
      onError: () => {},
      onCompleted: (data) => {
        const { _id } = data.postArticle || data.updateArticle;
        disableRouteChangeEvent();
        router.push(`${ARTICLES_ROUTE}/${_id}`);
      },
    }
  );

  const [deleteArticle, { error: errorDelete, loading: loadingDelete }] =
    useMutation(DELETE_ARTICLE_MUTATION, {
      onError: () => {},
      onCompleted: () => {
        disableRouteChangeEvent();
        router.push("/");
      },
    });

  useEffect(() => {
    const graphQLErrors = errorSubmit?.graphQLErrors;
    setErrorMessage(graphQLErrors ? graphQLErrors[0]?.message : null);
  }, [errorSubmit]);

  useEffect(() => {
    const graphQLErrors = errorDelete?.graphQLErrors;
    setErrorMessage(graphQLErrors ? graphQLErrors[0]?.message : null);
  }, [errorDelete]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const _id = article?._id || "";
    const { title, body } = state;
    submit({ variables: { _id, title, body } });
  };

  const handleDeleteClick = () => {
    if (article && confirm("Are you sure you want to delete article?")) {
      window.scroll(0, 0);
      deleteArticle({ variables: { _id: article._id } });
    }
  };

  const errorDiv = errorMessage && (
    <div className="error_div">
      <p>{errorMessage}</p>
    </div>
  );

  const loadingDiv = (loadingSubmit || loadingDelete) && (
    <div className={styles.form__loading_div}>
      <Loader />
    </div>
  );

  const cancelButton = (
    <button
      type="button"
      onClick={() => router.back()}
      className={styles.form__cancel_button}
    >
      Cancel
    </button>
  );

  const deleteButton = article && (
    <button
      type="button"
      onClick={handleDeleteClick}
      className={styles.form__delete_button}
    >
      Delete Article
    </button>
  );

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {cancelButton}
      {loadingDiv}
      {errorDiv}
      <input
        value={state.title}
        placeholder="Title"
        className={styles.form__title_input}
        onChange={(e) => setState({ ...state, title: e.target.value })}
      />
      <textarea
        placeholder="Body"
        value={state.body}
        className={styles.form__body_textarea}
        onChange={(e) => setState({ ...state, body: e.target.value })}
      />
      <div className={styles.form__buttons}>
        <button
          onClick={() => window.scroll(0, 0)}
          className={styles.form__submit_button}
          disabled={loadingSubmit || loadingDelete}
        >
          {article ? "Submit Changes" : "Post Article"}
        </button>
        {deleteButton}
      </div>
    </form>
  );
};

export default ArticleForm;
