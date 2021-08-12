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

  return (
    <div className="container">
      <Breadcrumbs links={breadcrumbsLinks} />
      <h1 className={styles.title}>{user.name}</h1>
      <p className={styles.user_email}>{user.email}</p>
      <div className={styles.articles_div}>
        <h2 className={styles.articles_div__heading}>Articles</h2>
        {loadingArticles ? (
          <div className={styles.articles_div__loading_div}>
            <Loader />
          </div>
        ) : (
          <ArticlesList articles={userArticles.articles} />
        )}
      </div>
    </div>
  );
};

export default User;
