import { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { IArticle } from "@types";

import styles from "./Article.module.scss";
import { useGetUser } from "@hooks";

interface Props {
  article: IArticle;
}

const Article: FC<Props> = ({ article }) => {
  const user = useGetUser();
  const { asPath } = useRouter();

  const editLink = user && (
    <Link href={`${asPath}/edit`}>
      <a className="color_primary">Edit</a>
    </Link>
  );

  return (
    <div className="container">
      <h1 className="page_title">{article.title}</h1>
      <div className={styles.article_content}>
        {editLink}
        <p className={styles.article_content__body}>{article.body}</p>
      </div>
    </div>
  );
};

export default Article;
