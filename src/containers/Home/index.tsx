import { FC } from "react";
import Link from "next/link";
import { useQuery } from "@apollo/client";

import { ARTICLES_QUERY } from "@graphql";
import { ArticlesList, Loader } from "@components";
import { ARTICLES_ROUTE, REGISTER_ROUTE } from "@constants";

import styles from "./Home.module.scss";
import { useIsAuthenticated } from "@hooks";

const Home: FC = () => {
  const isAuthenticated = useIsAuthenticated();

  const { data: articlesData, loading: loadingArticles } = useQuery(
    ARTICLES_QUERY,
    { variables: { limit: 3 } }
  );

  const loadingDiv = (
    <div className={styles.articles_section__loading_div}>
      <Loader />
    </div>
  );

  const topSection = (
    <section className={styles.top_section}>
      <div className="container">
        <div className="flex_center">
          <h1 className={styles.top_section__title}>Read</h1>
          <h2 className={styles.top_section__subtitle}>
            Broaden your knowledge.
          </h2>
          {!isAuthenticated && (
            <Link href={REGISTER_ROUTE}>
              <button className={styles.top_section__join_button}>Join</button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );

  const articlesSection = (
    <section className={styles.articles_section}>
      <div className="container">
        <h2 className={styles.articles_section__heading}>Latest Articles</h2>
        {loadingArticles ? (
          loadingDiv
        ) : (
          <ArticlesList articles={articlesData?.articles.articles} />
        )}
        <div className="flex_center">
          <Link href={ARTICLES_ROUTE}>
            <a className={styles.articles_section__see_more_link}>
              See More Articles
            </a>
          </Link>
        </div>
      </div>
    </section>
  );

  return (
    <>
      {topSection}
      {articlesSection}
    </>
  );
};

export default Home;
