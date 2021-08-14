import { FC } from "react";
import { useRouter } from "next/router";

import { Breadcrumbs } from "@components";
import { EDIT_ACCOUNT_ROUTE, MY_ACCOUNT_ROUTE } from "@constants";

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

  return (
    <div className="container_small">
      <Breadcrumbs links={breadcrumbsLinks} />
      <div className={styles.content}>
        <h1 className="page_title">Edit Account</h1>
        <button onClick={handleCancel} className={styles.cancel_button}>
          Cancel
        </button>
        <Form />
      </div>
    </div>
  );
};

export default EditAccount;
