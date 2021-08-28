import { useState, FC } from "react";
import { useQuery } from "@apollo/client";

import { IArticle } from "@types";
import { ARTICLES_QUERY } from "@graphql";
import { useConfigListParams } from "@hooks";
import CloseIcon from "@assets/CloseIcon.svg";
import { Loader, Searchbox, Pagination, ArticlesList } from "@components";

import styles from "./Articles.module.scss";
import LimitButtonsDiv from "./LimitButtonsDiv";

const limitOptions = [6, 9, 18];

const ListSection: FC = () => {
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(limitOptions[1]);
  const [showLoading, setShowLoading] = useState(true);
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [showLimitControls, setShowLimitControls] = useState(true);
  const [searchFilter, setSearchFilter] = useState<string | null>(null);

  const { data: articlesData, loading: loadingUsers } = useQuery(
    ARTICLES_QUERY,
    { variables: { limit, offset, searchFilter } }
  );

  useConfigListParams({
    limit,
    offset,
    setLimit,
    articles,
    setOffset,
    setArticles,
    limitOptions,
    searchFilter,
    articlesData,
    loadingUsers,
    setShowLoading,
    setShowLimitControls,
  });

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

  const showMoreButton = totalArticlesCount > articles?.length && (
    <div className={styles.list__show_more}>
      <button onClick={() => setOffset(offset + limit)}>Show More</button>
    </div>
  );

  const listTopSettings = (
    <div className={styles.list__top_settings_div}>
      <Searchbox
        placeholder="Search by title"
        setSearchFilter={setSearchFilter}
      />
      {showLimitControls && (
        <LimitButtonsDiv
          limit={limit}
          setLimit={setLimit}
          limitOptions={limitOptions}
        />
      )}
    </div>
  );

  const mainContent = (
    <div>
      {searchFilter && (
        <p className={styles.list__showing_matches_p}>
          Showing matches for: {`"${searchFilter}"`}
          <CloseIcon
            onClick={() => setSearchFilter(null)}
            className={styles.list__clear_filter_icon}
          />
        </p>
      )}
      {articles && !showLoading && <ArticlesList articles={articles} />}
      {loadingUsers && smallLoadingDiv}
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
  );

  return (
    <section className={styles.list}>
      {listTopSettings}
      {showLoading ? loadingDiv : mainContent}
    </section>
  );
};

export default ListSection;
