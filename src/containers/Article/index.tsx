import { useMemo, FC } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { IArticle } from "@types";
import { useGetUser } from "@hooks";
import { Breadcrumbs } from "@components";
import { ARTICLES_ROUTE } from "@constants";

import styles from "./Article.module.scss";

interface Props {
  article: IArticle;
}

const Article: FC<Props> = ({ article }) => {
  const user = useGetUser();
  const { asPath } = useRouter();

  const breadcrumbsLinks = useMemo(
    () => [
      { text: "Home", href: "/" },
      { text: "Articles", href: ARTICLES_ROUTE },
      { text: "Article", href: asPath },
    ],
    [asPath]
  );

  const editLink = user && (
    <Link href={`${asPath}/edit`}>
      <a className="color_primary">Edit Article</a>
    </Link>
  );

  return (
    <div className="container_small">
      <Breadcrumbs links={breadcrumbsLinks} />
      {editLink}
      <div className={styles.article_content}>
        <h1 className="page_title">{article.title}</h1>
        <p className={styles.article_content__body}>{article.body}</p>
      </div>
    </div>
  );
};

export default Article;
