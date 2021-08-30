import { useState, FC } from "react";
import { useMutation, useQuery } from "@apollo/client";

import {
  SAVE_ARTICLE_MUTATION,
  SAVED_ARTICLES_IDS_QUERY,
  REMOVE_SAVED_ARTICLE_MUTATION,
} from "@graphql";
import { IArticle } from "@types";
import { Loader } from "@components";
import BookmarkIcon from "@assets/BookmarkIcon.svg";
import BookmarkBorderIcon from "@assets/BookmarkBorderIcon.svg";

import styles from "./Article.module.scss";

interface Props {
  article: IArticle;
}

const SaveButton: FC<Props> = ({ article }) => {
  const [articleIsSaved, setArticleIsSaved] = useState(false);

  const [toggleSaved, { loading: loadingSave }] = useMutation(
    articleIsSaved ? REMOVE_SAVED_ARTICLE_MUTATION : SAVE_ARTICLE_MUTATION,
    {
      onError: () => {
        alert("Something went wrong");
        setArticleIsSaved(!articleIsSaved);
      },
    }
  );

  const { loading: loadingSavedArticlesIds } = useQuery(
    SAVED_ARTICLES_IDS_QUERY,
    {
      fetchPolicy: "no-cache",
      onError: () => {},
      onCompleted: (data) => {
        const foundSavedArticle = data.savedArticles.find(
          ({ _id }: { _id: string }) => _id === article._id
        );
        setArticleIsSaved(foundSavedArticle);
      },
    }
  );

  const handleSaveButtonClick = () => {
    setArticleIsSaved(!articleIsSaved);
    toggleSaved({ variables: { articleId: article._id } });
  };

  return !loadingSavedArticlesIds ? (
    <button
      disabled={loadingSave}
      onClick={handleSaveButtonClick}
      className={styles.top_section__save_button}
    >
      {articleIsSaved ? (
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
  ) : (
    <Loader className={styles.top_section__save_button_loader} />
  );
};

export default SaveButton;
