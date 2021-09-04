import { useState, useEffect, useMemo, useRef, FC } from "react";
import { render } from "react-dom";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";

import { IArticle } from "@types";
import { Breadcrumbs } from "@components";
import { ARTICLES_ROUTE } from "@constants";
import { useHideLongArticle } from "@hooks";

import Comments from "./Comments";
import TopSection from "./TopSection";
import styles from "./Article.module.scss";

interface Props {
  article: IArticle;
}

const Article: FC<Props> = ({ article }) => {
  const [showingAll, setShowingAll] = useState(true);

  const { asPath } = useRouter();
  const articleElementRef = useRef<HTMLDivElement>(null);

  useHideLongArticle(articleElementRef, showingAll);

  useEffect(() => {
    if (!article.body) return;

    const markdownString = article.body.replaceAll("# ", "## ");

    render(
      <ReactMarkdown children={markdownString} />,
      articleElementRef.current
    );

    setTimeout(() => {
      if (Number(articleElementRef.current?.clientHeight) > 600) {
        setShowingAll(false);
      }
    });
  }, []);

  const breadcrumbsLinks = useMemo(
    () => [
      { text: "Home", href: "/" },
      { text: "Articles", href: ARTICLES_ROUTE },
      { text: "Article", href: asPath },
    ],
    [asPath]
  );

  const hideGradient = !showingAll && (
    <>
      <div className={styles.article_body__hide_gradient} />
      <div className="flex_center">
        <button
          onClick={() => setShowingAll(true)}
          className={styles.article_body__continue_reading_button}
        >
          Continue Reading
        </button>
      </div>
    </>
  );

  return (
    <div className="container_small">
      <Breadcrumbs links={breadcrumbsLinks} />
      <TopSection article={article} />

      <section>
        <article ref={articleElementRef} className={styles.article_body} />
        {hideGradient}
      </section>

      <section>
        <Comments />
      </section>
    </div>
  );
};

export default Article;
