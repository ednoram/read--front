import { FC } from "react";

import { IArticle } from "@types";

import Article from "./Article";
import styles from "./ArticlesList.module.scss";

interface Props {
  articles: IArticle[];
}

const ArticlesList: FC<Props> = ({ articles }) => {
  return (
    <ul className={styles.list}>
      {articles.map((article) => (
        <li key={article._id}>
          <Article article={article} />
        </li>
      ))}
    </ul>
  );
};

export default ArticlesList;
