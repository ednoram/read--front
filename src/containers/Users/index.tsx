import { useState, useEffect, FC } from "react";
import Link from "next/link";
import { useQuery } from "@apollo/client";

import { IUser } from "@types";
import { USERS_QUERY } from "@graphql";
import { USERS_ROUTE } from "@constants";
import CloseIcon from "@assets/CloseIcon.svg";
import { Breadcrumbs, Searchbox, Loader } from "@components";

import styles from "./Users.module.scss";

const breadcrumbsLinks = [
  { text: "Home", href: "/" },
  { text: "Users", href: USERS_ROUTE },
];

const limit = 6;

const Users: FC = () => {
  const [offset, setOffset] = useState(0);
  const [showList, setShowList] = useState(false);
  const [users, setUsers] = useState<IUser[]>([]);
  const [searchFilter, setSearchFilter] = useState<string | null>(null);

  const { data: usersData, loading: loadingUsers } = useQuery(USERS_QUERY, {
    fetchPolicy: "no-cache",
    variables: { searchFilter, offset, limit },
  });

  useEffect(() => {
    if (usersData?.users?.users) {
      setUsers([...users, ...usersData?.users?.users]);
      setShowList(true);
    }
  }, [usersData]);

  useEffect(() => {
    setShowList(false);
    setUsers([]);
    setOffset(0);
  }, [searchFilter]);

  const handleShowMoreClick = () => {
    setOffset(offset + limit);
  };

  const totalUsersCount = usersData?.users?.totalCount || null;

  const loadingDiv = (
    <div className={styles.list_section__loading_div}>
      <Loader />
    </div>
  );

  const list =
    users && users.length > 0 ? (
      <ul className={styles.list_section__list}>
        {users.map(({ _id, name, email, about }) => (
          <li key={_id} className={styles.list_section__item}>
            <div>
              <div>
                <Link href={`${USERS_ROUTE}/${email}`}>
                  <a className={styles.list_section__user_name}>{name}</a>
                </Link>
              </div>
              <div>
                <Link href={`${USERS_ROUTE}/${email}`}>
                  <a className={styles.list_section__user_email}>{email}</a>
                </Link>
              </div>
              {about && (
                <p className={styles.list_section__user_about}>{about}</p>
              )}
            </div>
            <div className={styles.list_section__see_user_div}>
              <Link href={`${USERS_ROUTE}/${email}`}>
                <a>See User</a>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    ) : (
      <p className={styles.list_section__nothing_was_found_p}>
        Nothing was found
      </p>
    );

  const showMoreButton = totalUsersCount &&
    totalUsersCount > offset + limit && (
      <div className="flex_center">
        <button
          onClick={handleShowMoreClick}
          className={styles.list_section__show_more_button}
        >
          Show more
        </button>
      </div>
    );

  return (
    <div className="container">
      <Breadcrumbs links={breadcrumbsLinks} />
      <section>
        <h1 className="page_title">Users</h1>
      </section>
      <section className={styles.list_section}>
        <div className={styles.list_section__searchbox_container}>
          <Searchbox
            setSearchFilter={setSearchFilter}
            placeholder="Search by name or email"
          />
        </div>
        {searchFilter && (
          <p className={styles.list_section__showing_matches_p}>
            Showing matches for {`"${searchFilter}"`}
            <CloseIcon
              onClick={() => setSearchFilter(null)}
              className={styles.list_section__clear_filter_icon}
            />
          </p>
        )}
        {showList && list}
        {loadingUsers && loadingDiv}
        {showMoreButton}
      </section>
    </div>
  );
};

export default Users;
