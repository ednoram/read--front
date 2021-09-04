import { FC, Dispatch, SetStateAction } from "react";

import { IArticle } from "@types";
import { useMutation } from "@apollo/client";
import ThumbUpIcon from "@assets/ThumbUpIcon.svg";
import ThumbUpOutlinedIcon from "@assets/ThumbUpOutlinedIcon.svg";
import { LIKE_ARTICLE_MUTATION, UNLIKE_ARTICLE_MUTATION } from "@graphql";

import styles from "./Article.module.scss";

interface Props {
  article: IArticle;
  isLiked: boolean | null;
  setIsLiked: Dispatch<SetStateAction<boolean | null>>;
  setLikesCount: Dispatch<SetStateAction<number>>;
}

const LikeButton: FC<Props> = ({
  article,
  isLiked,
  setIsLiked,
  setLikesCount,
}) => {
  const [click, { loading }] = useMutation(
    isLiked ? UNLIKE_ARTICLE_MUTATION : LIKE_ARTICLE_MUTATION,
    {
      onError: () => {
        alert("Something went wrong");
        setIsLiked(!isLiked);
      },
      onCompleted: () => {
        isLiked
          ? setLikesCount((state) => state + 1)
          : setLikesCount((state) => state - 1);
      },
    }
  );

  const handleButtonClick = () => {
    setIsLiked(!isLiked);
    click({ variables: { articleId: article._id } });
  };

  const icon = isLiked ? (
    <ThumbUpIcon className={styles.top_section__like_icon} />
  ) : (
    <ThumbUpOutlinedIcon className={styles.top_section__like_icon} />
  );

  return (
    <button
      disabled={loading}
      onClick={handleButtonClick}
      className={styles.top_section__like_button}
    >
      <div className="flex_space_between">
        {icon}
        {isLiked ? "Unlike" : "Like"}
      </div>
    </button>
  );
};

export default LikeButton;
