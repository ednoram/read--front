import { useState, useEffect, useMemo, useRef, FC } from "react";
import Link from "next/link";
import { render } from "react-dom";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";

import { IArticle } from "@types";
import { useGetUser } from "@hooks";
import { Breadcrumbs } from "@components";
import { ARTICLES_ROUTE, USERS_ROUTE } from "@constants";

import styles from "./Article.module.scss";

interface Props {
  article: IArticle;
}

const Article: FC<Props> = ({ article }) => {
  const user = useGetUser();
  const { asPath } = useRouter();
  const [showingAll, setShowingAll] = useState(false);
  const articleElementRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const markdownString = article.body.replaceAll("# ", "## ");
    render(
      <ReactMarkdown children={markdownString} />,
      articleElementRef.current
    );
  }, []);

  useEffect(() => {
    if (articleElementRef.current) {
      if (showingAll) {
        articleElementRef.current.style.height = "unset";
        articleElementRef.current.style.overflow = "unset";
      } else {
        articleElementRef.current.style.height = "600px";
        articleElementRef.current.style.overflow = "hidden";
      }
    }
  }, [showingAll, articleElementRef.current?.clientHeight]);

  const breadcrumbsLinks = useMemo(
    () => [
      { text: "Home", href: "/" },
      { text: "Articles", href: ARTICLES_ROUTE },
      { text: "Article", href: asPath },
    ],
    [asPath]
  );

  const getDateString = (date: string) => {
    return new Date(Number(date)).toLocaleDateString("en", {
      month: "short",
      year: "numeric",
      day: "numeric",
    });
  };

  const editLink = user?.email === article.userEmail && (
    <Link href={`${asPath}/edit`}>
      <a className="color_primary">Edit Article</a>
    </Link>
  );

  return (
    <div className="container_small">
      <Breadcrumbs links={breadcrumbsLinks} />
      {editLink}
      <div className={styles.content}>
        <h1 className={styles.content__title}>{article.title}</h1>
        <p className={styles.content__user}>
          By:{" "}
          <Link href={`${USERS_ROUTE}/${article.userEmail}`}>
            <a>{article.userEmail}</a>
          </Link>
        </p>
        <div className={styles.content__dates}>
          <p>Created At: {getDateString(article.createdAt)}</p>
          <p>Updated At: {getDateString(article.updatedAt)}</p>
        </div>
        <article ref={articleElementRef} className={styles.content__body} />
        {!showingAll && (
          <>
            <div className={styles.content__body_fade} />
            <div className="flex_center">
              <button
                onClick={() => setShowingAll(true)}
                className={styles.content__continue_reading_button}
              >
                Continue Reading
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Article;
