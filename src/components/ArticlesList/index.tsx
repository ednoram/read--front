import { FC } from "react";

import { IArticle } from "@types";
import { MultiCarousel } from "@components";

import ListItem from "./ListItem";
import styles from "./ArticlesList.module.scss";

interface Props {
  articles: IArticle[];
  carousel?: boolean;
}

const ArticlesList: FC<Props> = ({ articles, carousel }) => {
  if (!articles) {
    return <p className={styles.nothing_was_found_p}>Nothing was found</p>;
  }

  const list = carousel ? (
    <div className={styles.carousel_list}>
      <MultiCarousel>
        {articles.map((article) => (
          <div key={article._id}>
            <ListItem article={article} />
          </div>
        ))}
      </MultiCarousel>
    </div>
  ) : (
    <ul className={styles.list}>
      {articles.map((article) => (
        <li key={article._id}>
          <ListItem article={article} />
        </li>
      ))}
    </ul>
  );

  return articles && articles.length > 0 ? list : <></>;
};

export default ArticlesList;
