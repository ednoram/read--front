import { useMemo, FC } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";

import { ARTICLES_QUERY } from "@graphql";
import { MY_ACCOUNT_ROUTE } from "@constants";
import { useGetUser, useLogoutFunction } from "@hooks";
import { ArticlesList, Breadcrumbs, Loader } from "@components";

import styles from "./MyAccount.module.scss";

const MyAccount: FC = () => {
  const user = useGetUser();
  const asPath = useRouter();
  const logout = useLogoutFunction();
  const { data: myArticles, loading: loadingArticles } = useQuery(
    ARTICLES_QUERY,
    {
      onError: () => {},
      fetchPolicy: "no-cache",
      variables: { userEmail: user?.email },
    }
  );

  const breadcrumbsLinks = useMemo(
    () => [
      { text: "Home", href: "/" },
      { text: "My Account", href: MY_ACCOUNT_ROUTE },
    ],
    [asPath]
  );

  const handleLogout = () => {
    if (confirm("Are you sure you want to log out?")) {
      logout();
    }
  };

  return user ? (
    <div className="container">
      <Breadcrumbs links={breadcrumbsLinks} />
      <h1 className="page_title">My Account</h1>
      <Link href="/404">
        <a className="color_primary">Edit Account</a>
      </Link>
      <div className={styles.content}>
        <p className={styles.content__user_name}>{user.name}</p>
        <p className={styles.content__user_email}>{user.email}</p>
        <div className={styles.content__my_articles}>
          <h2 className={styles.content__my_articles_heading}>
            My Articles {myArticles && `(${myArticles.articles.length})`}
          </h2>
          {loadingArticles ? (
            <div className={styles.content__list_loading_div}>
              <Loader />
            </div>
          ) : (
            <ArticlesList articles={myArticles?.articles} />
          )}
        </div>
        <button
          onClick={handleLogout}
          className={styles.content__logout_button}
        >
          Log Out
        </button>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default MyAccount;
