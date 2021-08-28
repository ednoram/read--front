import { useMemo, FC } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";

import { IUser } from "@types";
import { USERS_ROUTE } from "@constants";
import { ARTICLES_QUERY } from "@graphql";
import { ArticlesList, Breadcrumbs, Loader } from "@components";

import styles from "./User.module.scss";

interface Props {
  user: IUser;
}

const User: FC<Props> = ({ user }) => {
  const { asPath } = useRouter();
  const { data: userArticles, loading: loadingArticles } = useQuery(
    ARTICLES_QUERY,
    {
      onError: () => {},
      fetchPolicy: "no-cache",
      variables: { userEmail: user.email },
    }
  );

  const breadcrumbsLinks = useMemo(
    () => [
      { text: "Home", href: "/" },
      { text: "Users", href: USERS_ROUTE },
      { text: "User", href: asPath },
    ],
    [asPath]
  );

  const articles = userArticles?.articles.articles;

  const userInfoSection = (
    <section>
      <h1 className={styles.title}>{user.name}</h1>
      <p className={styles.user_email}>{user.email}</p>
      {user.about && (
        <div className={styles.user_about}>
          <h2 className={styles.user_about__heading}>About</h2>
          <p className={styles.user_about__text}>{user.about}</p>
        </div>
      )}
    </section>
  );

  const articlesSection = (
    <section className={styles.articles}>
      <h2 className={styles.articles__heading}>
        Articles {articles && `(${articles.length})`}
      </h2>
      {loadingArticles ? (
        <div className={styles.articles__loading_div}>
          <Loader />
        </div>
      ) : (
        <ArticlesList articles={articles} carousel />
      )}
    </section>
  );

  return (
    <div className="container">
      <Breadcrumbs links={breadcrumbsLinks} />
      {userInfoSection}
      {articlesSection}
    </div>
  );
};

export default User;
