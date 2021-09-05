import { FC, SetStateAction, Dispatch } from "react";
import { useMutation } from "@apollo/client";

import { IArticle } from "@types";
import BookmarkIcon from "@assets/BookmarkIcon.svg";
import BookmarkBorderIcon from "@assets/BookmarkBorderIcon.svg";
import { SAVE_ARTICLE_MUTATION, REMOVE_SAVED_ARTICLE_MUTATION } from "@graphql";

import styles from "./Article.module.scss";

interface Props {
  article: IArticle;
  isSaved: boolean | null;
  setIsSaved: Dispatch<SetStateAction<boolean | null>>;
}

const SaveButton: FC<Props> = ({ article, isSaved, setIsSaved }) => {
  const [toggleSaved, { loading: loadingSave }] = useMutation(
    isSaved ? REMOVE_SAVED_ARTICLE_MUTATION : SAVE_ARTICLE_MUTATION,
    {
      onError: () => {
        alert("Something went wrong.");
        setIsSaved(!isSaved);
      },
    }
  );

  const handleSaveButtonClick = () => {
    setIsSaved(!isSaved);
    toggleSaved({ variables: { articleId: article._id } });
  };

  return (
    <button
      disabled={loadingSave}
      onClick={handleSaveButtonClick}
      className={styles.top_section__save_button}
    >
      {isSaved ? (
        <div className="flex_space_between">
          <BookmarkIcon className={styles.top_section__save_icon} />
          <p>Unsave</p>
        </div>
      ) : (
        <div className="flex_space_between">
          <BookmarkBorderIcon className={styles.top_section__save_icon} />
          <p>Save</p>
        </div>
      )}
    </button>
  );
};

export default SaveButton;
