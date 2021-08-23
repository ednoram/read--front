import { FC } from "react";
import Link from "next/link";

import { Breadcrumbs } from "@components";
import { CHANGE_PASSWORD_ROUTE, MY_ACCOUNT_ROUTE } from "@constants";

import Form from "./Form";
import styles from "./ChangePassword.module.scss";

const breadcrumbsLinks = [
  { text: "Home", href: "/" },
  { text: "My Account", href: MY_ACCOUNT_ROUTE },
  { text: "Change Password", href: CHANGE_PASSWORD_ROUTE },
];

const ChangePassword: FC = () => {
  return (
    <div className="container_small">
      <Breadcrumbs links={breadcrumbsLinks} />
      <section>
        <h1 className="page_title">Change Password</h1>
        <div className={styles.cancel_link_div}>
          <Link href={MY_ACCOUNT_ROUTE}>
            <a>Cancel</a>
          </Link>
        </div>
      </section>
      <section>
        <Form />
      </section>
    </div>
  );
};

export default ChangePassword;
