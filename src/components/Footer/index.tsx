import { FC } from "react";
import Link from "next/link";

import styles from "./Footer.module.scss";

const Footer: FC = () => {
  const githubLink = (
    <Link href="https://github.com/ednoram">
      <a target="_blank">@ednoram</a>
    </Link>
  );

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className="flex_center">
          <p className={styles.footer__read_text}>Read</p>
          <p className={styles.footer__text}>By {githubLink}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
