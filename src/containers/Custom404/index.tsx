import { FC } from "react";
import Link from "next/link";
import Image from "next/image";

import styles from "./Custom404.module.scss";

const Custom404: FC = () => {
  const homeLink = (
    <Link href="/">
      <a className={styles.container__home_link}>Go to Home page</a>
    </Link>
  );

  return (
    <div className={styles.container}>
      <div className={styles.container__content}>
        <div className="flex_center">
          <Image src="/logo_512.png" height={120} width={120} />
        </div>
        <div className={styles.container__text_div}>
          <h1 className="page_title">404 Page not found</h1>
          <p className={styles.container__description}>
            The page you are looking for does not exist.
          </p>
          <div>{homeLink}</div>
        </div>
      </div>
    </div>
  );
};

export default Custom404;
