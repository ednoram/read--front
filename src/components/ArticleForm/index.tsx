import { useState, FC, FormEvent } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";

import { IArticle } from "@types";
import { Loader } from "@components";
import { ARTICLE_ROUTE } from "@constants";
import { disableRouteChangeEvent } from "@utils";
import { POST_ARTICLE_MUTATION, UPDATE_ARTICLE_MUTATION } from "@graphql";

import styles from "./ArticleForm.module.scss";

interface Props {
  article?: IArticle;
}

const ArticleForm: FC<Props> = ({ article }) => {
  const [state, setState] = useState({
    body: article?.body || "",
    title: article?.title || "",
  });

  const [submit, { error, loading }] = useMutation(
    article ? UPDATE_ARTICLE_MUTATION : POST_ARTICLE_MUTATION,
    {
      onError: () => {},
      onCompleted: (data): void => {
        const { _id } = data.postArticle || data.updateArticle;
        disableRouteChangeEvent();
        router.push(`${ARTICLE_ROUTE}/${_id}`);
      },
    }
  );
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const _id = article?._id || "";
    const { title, body } = state;
    submit({ variables: { _id, title, body } });
  };

  const graphQLErrors = error?.graphQLErrors;
  const errorMessage = graphQLErrors && graphQLErrors[0]?.message;

  const errorDiv = errorMessage && (
    <div className="error_div">
      <p>{errorMessage}</p>
    </div>
  );

  const loadingDiv = loading && (
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
      <div className={styles.form__submit_button_div}>
        <button
          disabled={loading}
          onClick={() => window.scroll(0, 0)}
          className={styles.form__submit_button}
        >
          {article ? "Submit Changes" : "Post Article"}
        </button>
      </div>
    </form>
  );
};

export default ArticleForm;
