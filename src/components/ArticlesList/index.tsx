import { FC } from "react";

import { IArticle } from "@types";

import ListItem from "./ListItem";
import styles from "./ArticlesList.module.scss";

interface Props {
  articles: IArticle[];
}

const ArticlesList: FC<Props> = ({ articles }) => {
  return (
    <ul className={styles.list}>
      {articles && articles.length > 0 ? (
        articles.map((article) => (
          <li key={article._id}>
            <ListItem article={article} />
          </li>
        ))
      ) : (
        <p>Nothing was found</p>
      )}
    </ul>
  );
};

export default ArticlesList;
