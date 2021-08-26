import { useState, useEffect, FC } from "react";
import { useQuery } from "@apollo/client";

import {
  Loader,
  Searchbox,
  Pagination,
  Breadcrumbs,
  ArticlesList,
} from "@components";
import { IArticle } from "@types";
import { useWindowSize } from "@hooks";
import { ARTICLES_QUERY } from "@graphql";
import { ARTICLES_ROUTE } from "@constants";

import styles from "./Articles.module.scss";
import CloseIcon from "@assets/CloseIcon.svg";
import LimitButtonsDiv from "./LimitButtonsDiv";

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
  const [searchFilter, setSearchFilter] = useState<string | null>(null);

  const { data: articlesData, loading } = useQuery(ARTICLES_QUERY, {
    variables: { limit, offset, searchFilter },
  });

  const windowSize = useWindowSize();

  useEffect(() => {
    setOffset(0);
  }, [limit, searchFilter]);

  useEffect(() => {
    if (windowSize.width && windowSize.width > 560) {
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
      windowSize.width &&
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

  const showMoreButton = totalArticlesCount > articles.length && (
    <div className={styles.list__show_more}>
      <button onClick={() => setOffset(offset + limit)}>Show More</button>
    </div>
  );

  const listTopSettings = (
    <div className={styles.list__top_settings_div}>
      <Searchbox setSearchFilter={setSearchFilter} />
      {showLimitControls && (
        <LimitButtonsDiv
          limit={limit}
          setLimit={setLimit}
          limitOptions={limitOptions}
        />
      )}
    </div>
  );

  const listSection = (
    <section className={styles.list}>
      {listTopSettings}
      {(loading && windowSize.width && windowSize.width > 560) ||
      (loading && articles.length === 0) ? (
        loadingDiv
      ) : (
        <div>
          {searchFilter && (
            <p className={styles.list__showing_matches_p}>
              Showing matches for: &quot;{searchFilter}&quot;
              <CloseIcon
                onClick={() => setSearchFilter(null)}
                className={styles.list__clear_filter_icon}
              />
            </p>
          )}
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
        </div>
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
