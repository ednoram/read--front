import { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import {
  MY_ACCOUNT_ROUTE,
  EDIT_ACCOUNT_ROUTE,
  CHANGE_PASSWORD_ROUTE,
} from "@constants";
import { Breadcrumbs } from "@components";

import Form from "./Form";
import styles from "./EditAccount.module.scss";

const breadcrumbsLinks = [
  { text: "Home", href: "/" },
  { text: "My Account", href: MY_ACCOUNT_ROUTE },
  { text: "Edit Account", href: EDIT_ACCOUNT_ROUTE },
];

const EditAccount: FC = () => {
  const router = useRouter();

  const handleCancel = () => {
    router.push(MY_ACCOUNT_ROUTE);
  };

  const links = (
    <div className={styles.content__links}>
      <Link href={CHANGE_PASSWORD_ROUTE}>
        <a className="color_primary">Change Password</a>
      </Link>
    </div>
  );

  return (
    <div className="container_small">
      <Breadcrumbs links={breadcrumbsLinks} />
      <div className={styles.content}>
        <section>
          <h1 className="page_title">Edit Account</h1>
          <button
            onClick={handleCancel}
            className={styles.content__cancel_button}
          >
            Cancel
          </button>
        </section>

        <section>
          <Form />
        </section>

        <section>{links}</section>
      </div>
    </div>
  );
};

export default EditAccount;
