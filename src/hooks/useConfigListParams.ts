import { useState, useEffect, Dispatch, SetStateAction } from "react";

import { IArticle } from "@types";
import { useWindowSize } from "@hooks";

interface Parameters {
  limit: number;
  offset: number;
  articles: IArticle[];
  loadingUsers: boolean;
  limitOptions: number[];
  searchFilter: string | null;
  setLimit: Dispatch<SetStateAction<number>>;
  setOffset: Dispatch<SetStateAction<number>>;
  setShowLoading: Dispatch<SetStateAction<boolean>>;
  setArticles: Dispatch<SetStateAction<IArticle[]>>;
  setShowLimitControls: Dispatch<SetStateAction<boolean>>;
  articlesData: { articles: { totalCount: number; articles: IArticle[] } };
}

const useConfigListParams = ({
  limit,
  offset,
  articles,
  setLimit,
  setOffset,
  setArticles,
  limitOptions,
  searchFilter,
  loadingUsers,
  articlesData,
  setShowLoading,
  setShowLimitControls,
}: Parameters): void => {
  const [cachedSearchFilter, setCachedSearchFilter] = useState<string | null>(
    null
  );

  const windowSize = useWindowSize();

  const isMobile = windowSize.width && windowSize.width <= 560;

  useEffect(() => {
    if (articlesData?.articles) {
      setArticles(articlesData.articles.articles);
    }
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setShowLoading(loadingUsers);
    }
  }, [loadingUsers]);

  useEffect(() => {
    setOffset(0);
  }, [limit, searchFilter]);

  useEffect(() => {
    setShowLoading(true);
    if (isMobile) {
      setArticles([]);
      setOffset(0);
    }
  }, [searchFilter]);

  useEffect(() => {
    if (!isMobile) {
      window.scroll(0, 0);
    }
  }, [offset, limit]);

  useEffect(() => {
    if (windowSize.width) {
      setShowLoading(loadingUsers && (!isMobile || articles?.length === 0));
    }
  }, [windowSize.width, articles]);

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

    if (isMobile && articles) {
      if (
        cachedSearchFilter === searchFilter &&
        !articles.find(
          (article) => article._id === articlesData.articles.articles[0]._id
        )
      ) {
        setArticles([...articles, ...articlesData.articles.articles]);
      } else {
        setArticles(articlesData.articles.articles);
        setCachedSearchFilter(searchFilter);
      }
      setShowLoading(false);
    } else {
      setArticles(articlesData.articles.articles);
    }
  }, [articlesData]);
};

export default useConfigListParams;
