import { FC } from "react";
import Link from "next/link";

import { IArticle } from "@types";
import { ARTICLES_ROUTE } from "@constants";

import styles from "./ArticlesList.module.scss";

interface Props {
  article: IArticle;
}

const Article: FC<Props> = ({ article }) => {
  const { _id, title, body } = article;
  const articleHref = `${ARTICLES_ROUTE}/${_id}`;

  return (
    <div className={styles.list__article}>
      <div>
        <Link href={articleHref}>
          <a className={styles.list__article_title}>{title}</a>
        </Link>
        <p className={styles.list__article_body}>{body.slice(0, 60)}</p>
      </div>
      <div className="flex_right">
        <Link href={articleHref}>
          <a className={styles.list__read_link}>Read</a>
        </Link>
      </div>
    </div>
  );
};

export default Article;
