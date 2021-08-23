import { useState, useEffect, FC } from "react";
import { nanoid } from "nanoid";
import { useQuery } from "@apollo/client";

import { IArticle } from "@types";
import { useWindowSize } from "@hooks";
import { ARTICLES_QUERY } from "@graphql";
import { ARTICLES_ROUTE } from "@constants";
import { ArticlesList, Breadcrumbs, Loader, Pagination } from "@components";

import styles from "./Articles.module.scss";

const breadcrumbsLinks = [
  { text: "Home", href: "/" },
  { text: "Articles", href: ARTICLES_ROUTE },
];

const limitOptions = [6, 9, 18];

const Articles: FC = () => {
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(limitOptions[1]);
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [showLimitControls, setShowLimitControls] = useState(true);

  const { data: articlesData, loading } = useQuery(ARTICLES_QUERY, {
    variables: { limit, offset },
  });

  const windowSize = useWindowSize();

  useEffect(() => {
    setOffset(0);
  }, [limit]);

  useEffect(() => {
    if (windowSize.width > 560) {
      window.scroll(0, 0);
    }
  }, [offset, limit]);

  useEffect(() => {
    if (!windowSize.width) return;

    if (windowSize.width <= 880) {
      setLimit(8);
      setShowLimitControls(false);
    } else {
      setShowLimitControls(true);

      if (!limitOptions.includes(limit)) {
        setLimit(limitOptions[1]);
      }
    }
  }, [windowSize.width]);

  useEffect(() => {
    if (!windowSize || !articlesData?.articles?.articles) return;

    if (
      windowSize.width <= 560 &&
      !articles.includes(articlesData.articles.articles[0])
    ) {
      setArticles([...articles, ...articlesData.articles.articles]);
    } else {
      setArticles(articlesData.articles.articles);
    }
  }, [articlesData]);

  const totalArticlesCount = articlesData?.articles?.totalCount;

  const loadingDiv = (
    <div className={styles.list__loading_div}>
      <Loader />
    </div>
  );

  const smallLoadingDiv = (
    <div className={styles.list__show_more_loading_div}>
      <Loader />
    </div>
  );

  const limitButtonsDiv = showLimitControls && (
    <div className={styles.list__limit_buttons}>
      <p>Items per page:</p>
      <ul>
        {limitOptions.map((option) => (
          <li key={nanoid()}>
            <button
              onClick={() => setLimit(option)}
              className={
                option === limit
                  ? styles.list__limit_button_active
                  : styles.list__limit_button
              }
            >
              {option}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );

  const showMoreButton = totalArticlesCount > articles.length && (
    <div className={styles.list__show_more}>
      <button onClick={() => setOffset(offset + limit)}>Show More</button>
    </div>
  );

  const listSection = (
    <section className={styles.list}>
      {(loading && windowSize.width > 560) ||
      (loading && articles.length === 0) ? (
        loadingDiv
      ) : (
        <>
          {limitButtonsDiv}
          <ArticlesList articles={articles} />
          {loading && smallLoadingDiv}
          {totalArticlesCount > limit && (
            <Pagination
              limit={limit}
              offset={offset}
              setOffset={setOffset}
              totalItemsCount={totalArticlesCount}
            />
          )}
          {showMoreButton}
        </>
      )}
    </section>
  );

  return (
    <div className="container">
      <Breadcrumbs links={breadcrumbsLinks} />
      <section>
        <h1 className="page_title">Articles</h1>
      </section>
      {listSection}
    </div>
  );
};

export default Articles;
