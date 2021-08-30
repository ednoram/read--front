import { FC } from "react";
import Link from "next/link";
import { useQuery } from "@apollo/client";

import EditIcon from "@assets/EditIcon.svg";
import { useGetUser, useLogoutFunction } from "@hooks";
import { ARTICLES_QUERY, SAVED_ARTICLES_QUERY } from "@graphql";
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

  const { data: myArticlesData, loading: loadingMyArticles } = useQuery(
    ARTICLES_QUERY,
    {
      fetchPolicy: "no-cache",
      variables: { userEmail: user?.email },
      onError: () => alert("Something went wrong"),
    }
  );

  const { data: savedArticlesData, loading: loadingSavedArticles } = useQuery(
    SAVED_ARTICLES_QUERY,
    {
      fetchPolicy: "no-cache",
      onError: () => alert("Something went wrong"),
    }
  );

  const myArticles = myArticlesData?.articles?.articles;

  const handleLogout = () => {
    if (confirm("Are you sure you want to log out?")) {
      logout();
    }
  };

  const loadingDiv = (
    <div className={styles.content__list_loading_div}>
      <Loader />
    </div>
  );

  const accountInfoSection = user && (
    <section>
      <Link href={EDIT_ACCOUNT_ROUTE}>
        <a className="color_primary">
          <EditIcon className={styles.content__edit_icon} />
          Edit Account
        </a>
      </Link>
      <p className={styles.content__user_name}>{user.name}</p>
      <p className={styles.content__user_email}>{user.email}</p>
      <div className={styles.content__user_about}>
        <h2 className="color_primary">About</h2>
        <p className={styles.content__user_about_text}>{user.about}</p>
      </div>
    </section>
  );

  const myArticlesSection = (
    <section>
      <div className={styles.content__articles}>
        <h2 className={styles.content__articles_heading}>
          My Articles {myArticles && `(${myArticles.length})`}
        </h2>
        {loadingMyArticles ? (
          loadingDiv
        ) : (
          <ArticlesList articles={myArticles} carousel />
        )}
      </div>
    </section>
  );

  const savedArticlesSection = (
    <section>
      <div className={styles.content__articles}>
        <h2 className={styles.content__articles_heading}>
          Saved Articles{" "}
          {savedArticlesData && `(${savedArticlesData?.savedArticles.length})`}
        </h2>
        {loadingSavedArticles ? (
          loadingDiv
        ) : (
          <ArticlesList articles={savedArticlesData?.savedArticles} carousel />
        )}
      </div>
    </section>
  );

  const logoutSection = (
    <section>
      <button onClick={handleLogout} className={styles.content__logout_button}>
        Log Out
      </button>
    </section>
  );

  return user ? (
    <div className="container">
      <Breadcrumbs links={breadcrumbsLinks} />
      <h1 className="page_title">My Account</h1>
      <div className={styles.content}>
        {accountInfoSection}
        {myArticlesSection}
        {savedArticlesSection}
        {logoutSection}
      </div>
    </div>
  ) : (
    <></>
  );
};

export default MyAccount;
