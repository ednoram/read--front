import { useEffect, useMemo, useRef, FC } from "react";
import Link from "next/link";
import { render } from "react-dom";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";

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
  const articleBodyDiv = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const markdownString = article.body.replaceAll("# ", "## ");
    render(<ReactMarkdown children={markdownString} />, articleBodyDiv.current);
  }, []);

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
      <div className={styles.content}>
        <h1 className={styles.content__title}>{article.title}</h1>
        <div ref={articleBodyDiv} className={styles.content__body} />
      </div>
    </div>
  );
};

export default Article;
