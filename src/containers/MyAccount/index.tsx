import { FC } from "react";
import Link from "next/link";
import { useQuery } from "@apollo/client";

import { ARTICLES_QUERY } from "@graphql";
import { useGetUser, useLogoutFunction } from "@hooks";
import { ArticlesList, Breadcrumbs, Loader } from "@components";
import { EDIT_ACCOUNT_ROUTE, MY_ACCOUNT_ROUTE } from "@constants";

import styles from "./MyAccount.module.scss";

const breadcrumbsLinks = [
  { text: "Home", href: "/" },
  { text: "My Account", href: MY_ACCOUNT_ROUTE },
];

const MyAccount: FC = () => {
  const user = useGetUser();
  const logout = useLogoutFunction();
  const { data: myArticles, loading: loadingArticles } = useQuery(
    ARTICLES_QUERY,
    {
      onError: () => {},
      fetchPolicy: "no-cache",
      variables: { userEmail: user?.email },
    }
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
      <div className={styles.content}>
        <section>
          <Link href={EDIT_ACCOUNT_ROUTE}>
            <a className="color_primary">Edit Account</a>
          </Link>
          <p className={styles.content__user_name}>{user.name}</p>
          <p className={styles.content__user_email}>{user.email}</p>
          <div className={styles.content__user_about}>
            <h2 className="color_primary">About</h2>
            <p className={styles.content__user_about_text}>{user.about}</p>
          </div>
        </section>
        <section>
          <div className={styles.content__my_articles}>
            <h2 className={styles.content__my_articles_heading}>
              My Articles {myArticles && `(${myArticles.articles.length})`}
            </h2>
            {loadingArticles ? (
              <div className={styles.content__list_loading_div}>
                <Loader />
              </div>
            ) : (
              <ArticlesList articles={myArticles?.articles} carousel />
            )}
          </div>
        </section>
        <section>
          <button
            onClick={handleLogout}
            className={styles.content__logout_button}
          >
            Log Out
          </button>
        </section>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default MyAccount;
