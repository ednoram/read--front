import { FC } from "react";
import Link from "next/link";

import { IArticle } from "@types";
import { ARTICLES_ROUTE, USERS_ROUTE } from "@constants";

import styles from "./ArticlesList.module.scss";

interface Props {
  article: IArticle;
}

const ListItem: FC<Props> = ({ article }) => {
  const { _id, title, body, userEmail } = article;
  const articleHref = `${ARTICLES_ROUTE}/${_id}`;

  const articleDate = new Date(Number(article.createdAt)).toLocaleDateString(
    "en",
    {
      month: "short",
      year: "numeric",
      day: "numeric",
    }
  );

  const userLink = (
    <Link href={`${USERS_ROUTE}/${userEmail}`}>
      <a>{userEmail}</a>
    </Link>
  );

  return (
    <div className={styles.list__article}>
      <div>
        <Link href={articleHref}>
          <a className={styles.list__article_title}>{title}</a>
        </Link>
        <p className={styles.list__article_body}>{body}</p>
        <p className={styles.list__article_user}>By: {userLink}</p>
        <p className={styles.list__article_date}>Date: {articleDate}</p>
      </div>
      <div className={styles.list__read_link_div}>
        <Link href={articleHref}>
          <a>Read</a>
        </Link>
      </div>
    </div>
  );
};

export default ListItem;
