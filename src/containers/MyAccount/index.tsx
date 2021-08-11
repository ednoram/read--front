import { useMemo, FC } from "react";
import { useRouter } from "next/router";

import { Breadcrumbs } from "@components";
import { useGetUser, useLogoutFunction } from "@hooks";
import { LOGIN_ROUTE, MY_ACCOUNT_ROUTE } from "@constants";

import styles from "./MyAccount.module.scss";

const MyAccount: FC = () => {
  const user = useGetUser();
  const asPath = useRouter();
  const logout = useLogoutFunction();

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
      location.href = LOGIN_ROUTE;
    }
  };

  return (
    user && (
      <div className="container">
        <Breadcrumbs links={breadcrumbsLinks} />
        <h1 className="page_title">My Account</h1>
        <div className={styles.content}>
          <p className={styles.content__user_name}>{user.name}</p>
          <button
            onClick={handleLogout}
            className={styles.content__logout_button}
          >
            Log Out
          </button>
        </div>
      </div>
    )
  );
};

export default MyAccount;
