import { useMemo, FC } from "react";
import { useRouter } from "next/router";

import { IArticle } from "@types";
import { ARTICLES_ROUTE } from "@constants";
import { ArticlesList, Breadcrumbs } from "@components";

import styles from "./Articles.module.scss";

interface Props {
  articles: IArticle[];
}

const Articles: FC<Props> = ({ articles }) => {
  const { asPath } = useRouter();

  const breadcrumbsLinks = useMemo(
    () => [
      { text: "Home", href: "/" },
      { text: "Articles", href: ARTICLES_ROUTE },
    ],
    [asPath]
  );

  return (
    <div className="container">
      <Breadcrumbs links={breadcrumbsLinks} />
      <h1 className="page_title">Articles</h1>
      <div className={styles.list}>
        <ArticlesList articles={articles} />
      </div>
    </div>
  );
};

export default Articles;
