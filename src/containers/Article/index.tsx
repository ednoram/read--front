import { useState, useEffect, useMemo, useRef, FC } from "react";
import Link from "next/link";
import { render } from "react-dom";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";

import { IArticle } from "@types";
import { useGetUser, useHideLongArticle } from "@hooks";
import { Breadcrumbs } from "@components";
import { ARTICLES_ROUTE, USERS_ROUTE } from "@constants";

import Comments from "./Comments";
import SaveButton from "./SaveButton";
import styles from "./Article.module.scss";

interface Props {
  article: IArticle;
}

const Article: FC<Props> = ({ article }) => {
  const [showingAll, setShowingAll] = useState(true);

  const user = useGetUser();
  const { asPath } = useRouter();
  const articleElementRef = useRef<HTMLDivElement>(null);

  useHideLongArticle(articleElementRef, showingAll);

  useEffect(() => {
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

  const getDateString = (date: string) => {
    return new Date(Number(date)).toLocaleDateString("en", {
      month: "short",
      year: "numeric",
      day: "numeric",
    });
  };

  const editLink =
    user?.email === article.userEmail ? (
      <div>
        <Link href={`${asPath}/edit`}>
          <a className="color_primary">Edit Article</a>
        </Link>
      </div>
    ) : (
      <div></div>
    );

  const userActions = user?.email && (
    <div className="flex_space_between">
      {editLink}
      <SaveButton article={article} />
    </div>
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
      {userActions}
      <section className={styles.top_section}>
        <h1 className={styles.top_section__title}>{article.title}</h1>
        <p className={styles.top_section__user}>
          By:{" "}
          <Link href={`${USERS_ROUTE}/${article.userEmail}`}>
            <a>{article.userEmail}</a>
          </Link>
        </p>
        <div className={styles.top_section__dates}>
          <p>Created At: {getDateString(article.createdAt)}</p>
          <p>Updated At: {getDateString(article.updatedAt)}</p>
        </div>
      </section>
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
