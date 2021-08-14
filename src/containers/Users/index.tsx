import { useMemo, FC } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { IUser } from "@types";
import { USERS_ROUTE } from "@constants";
import { Breadcrumbs } from "@components";

import styles from "./Users.module.scss";

interface Props {
  users: IUser[];
}

const Users: FC<Props> = ({ users }) => {
  const { asPath } = useRouter();

  const breadcrumbsLinks = useMemo(
    () => [
      { text: "Home", href: "/" },
      { text: "Users", href: USERS_ROUTE },
    ],
    [asPath]
  );

  const list = (
    <ul className={styles.list}>
      {users.map(({ _id, name, email, about }) => (
        <li key={_id} className={styles.list__item}>
          <div>
            <div>
              <Link href={`${USERS_ROUTE}/${email}`}>
                <a className={styles.list__user_name}>{name}</a>
              </Link>
            </div>
            <div>
              <Link href={`${USERS_ROUTE}/${email}`}>
                <a className={styles.list__user_email}>{email}</a>
              </Link>
            </div>
            {about && <p className={styles.list__user_about}>{about}</p>}
          </div>
          <div className={styles.list__see_user_div}>
            <Link href={`${USERS_ROUTE}/${email}`}>
              <a>See User</a>
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="container">
      <Breadcrumbs links={breadcrumbsLinks} />
      <h1 className="page_title">Users</h1>
      {list}
    </div>
  );
};

export default Users;
