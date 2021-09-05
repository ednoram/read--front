import { useState, FC, FormEvent, SetStateAction, Dispatch } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";

import {
  POST_COMMENT_MUTATION,
  UPDATE_COMMENT_MUTATION,
  DELETE_COMMENT_MUTATION,
} from "@graphql";
import { IComment } from "@types";
import { Loader } from "@components";
import { useIsAuthenticated } from "@hooks";
import { getGraphqlErrorMessage } from "@utils";

import styles from "./Article.module.scss";

interface Props {
  comment?: IComment;
  setEditing?: Dispatch<SetStateAction<boolean>>;
  setTotalCount: Dispatch<SetStateAction<number>>;
  setComments: Dispatch<SetStateAction<IComment[]>>;
}

const CommentForm: FC<Props> = ({
  comment,
  setEditing,
  setComments,
  setTotalCount,
}) => {
  const [inputValue, setInputValue] = useState(comment?.text || "");
  const { query } = useRouter();

  const isAuthenticated = useIsAuthenticated();

  const [submit, { error, loading: loadingSubmit }] = useMutation(
    comment ? UPDATE_COMMENT_MUTATION : POST_COMMENT_MUTATION,
    {
      onError: () => {
        if (!isAuthenticated) {
          alert("Log in to post comments.");
        }
      },
      onCompleted: (data) => {
        const response = comment ? data.updateComment : data.postComment;

        setComments((state) =>
          comment ? updateComment(state, response) : [response, ...state]
        );

        if (!comment) setTotalCount((state) => state + 1);

        if (setEditing) setEditing(false);
      },
    }
  );

  const [deleteComment, { loading: loadingDelete }] = useMutation(
    DELETE_COMMENT_MUTATION,
    {
      onError: () => {},
      onCompleted: ({ deleteComment: response }) => {
        setComments((state) => state.filter((x) => x._id !== response._id));
        setTotalCount((state) => state - 1);
      },
    }
  );

  const updateComment = (state: IComment[], response: { _id: string }) => {
    return state.map((x) => (x._id === response._id ? response : x));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const variables = comment
      ? { _id: comment._id, text: inputValue }
      : { text: inputValue, articleId: query.id };

    submit({ variables });
    setInputValue("");
  };

  const handleDelete = () => {
    const confirmed = confirm("Are you sure you want to delete comment?");

    if (comment && confirmed) {
      deleteComment({ variables: { _id: comment?._id } });
    }
  };

  const loading = loadingSubmit || loadingDelete;

  const errorMessage = getGraphqlErrorMessage(error);

  const errorDiv = errorMessage && (
    <div className="error_div">
      <p>{errorMessage}</p>
    </div>
  );

  const loadingDiv = (loadingSubmit || loadingDelete) && (
    <div className="loading_div">
      <Loader />
    </div>
  );

  const cancelButton = comment && setEditing && (
    <button
      disabled={loading}
      onClick={() => setEditing(false)}
      className={styles.comments__cancel_button}
    >
      Cancel
    </button>
  );

  const deleteButton = comment && setEditing && (
    <button
      type="button"
      disabled={loading}
      onClick={handleDelete}
      className={styles.comments__delete_button}
    >
      Delete
    </button>
  );

  const formContent = (!comment || !loading) && (
    <div className={styles.comments__form_content}>
      <input
        value={inputValue}
        placeholder="Comment"
        className={styles.comments__input}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <div className={styles.comments__form_buttons}>
        <button
          disabled={loading}
          className={styles.comments__form_submit_button}
        >
          {comment ? "Update" : "Post"}
        </button>
        {deleteButton}
        {cancelButton}
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit}>
      {formContent}
      {(error || loading) && (
        <div className={styles.comments__error_loading_div}>
          {errorDiv}
          {loadingDiv}
        </div>
      )}
    </form>
  );
};

export default CommentForm;
