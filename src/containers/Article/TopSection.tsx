import { useState, FC } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";

import { IArticle } from "@types";
import { useGetUser } from "@hooks";
import { Loader } from "@components";
import { USERS_ROUTE } from "@constants";
import EditIcon from "@assets/EditIcon.svg";
import { ARTICLE_LIKED_SAVED_QUERY } from "@graphql";

import LikeButton from "./LikeButton";
import SaveButton from "./SaveButton";
import styles from "./Article.module.scss";

interface Props {
  article: IArticle;
}

const TopSection: FC<Props> = ({ article }) => {
  const [isLiked, setIsLiked] = useState<boolean | null>(null);
  const [isSaved, setIsSaved] = useState<boolean | null>(null);
  const [likesCount, setLikesCount] = useState<number>(article.likesCount);

  const user = useGetUser();
  const { asPath } = useRouter();

  const { loading: loadingLikeSaveData } = useQuery(ARTICLE_LIKED_SAVED_QUERY, {
    variables: { articleId: article._id },
    onCompleted: (data) => {
      setIsSaved(data.article.isSaved);
      setIsLiked(data.article.isLiked);
    },
    onError: () => {
      alert("Something went wrong.");
    },
  });

  const getDateString = (date: string) => {
    return new Date(Number(date)).toLocaleDateString("en", {
      month: "short",
      year: "numeric",
      day: "numeric",
    });
  };

  const editLink =
    user?.email === article.userEmail ? (
      <div>
        <Link href={`${asPath}/edit`}>
          <a className="color_primary">
            <EditIcon className={styles.top_section__edit_icon} />
            Edit Article
          </a>
        </Link>
      </div>
    ) : (
      <div />
    );

  const likeSaveButtons = !loadingLikeSaveData ? (
    <div className={styles.top_section__like_save_buttons}>
      <SaveButton article={article} isSaved={isSaved} setIsSaved={setIsSaved} />
      <LikeButton
        article={article}
        isLiked={isLiked}
        setIsLiked={setIsLiked}
        setLikesCount={setLikesCount}
      />
    </div>
  ) : (
    <Loader className={styles.top_section__buttons_loader} />
  );

  const userActions = user?.email && (
    <div className="flex_space_between">
      {editLink}
      {likeSaveButtons}
    </div>
  );

  const userLink = (
    <Link href={`${USERS_ROUTE}/${article.userEmail}`}>
      <a>{article.userEmail}</a>
    </Link>
  );

  return (
    <section className={styles.top_section}>
      {userActions}
      <h1 className={styles.top_section__title}>{article.title}</h1>
      <p className={styles.top_section__user}>By: {userLink}</p>
      <p className={styles.top_section__likes_count}>Likes: {likesCount}</p>
      <div className={styles.top_section__dates}>
        <p>Created At: {getDateString(article.createdAt)}</p>
        <p>Updated At: {getDateString(article.updatedAt)}</p>
      </div>
    </section>
  );
};

export default TopSection;
