import { FC } from "react";
import Link from "next/link";
import Image from "next/image";

import styles from "./Footer.module.scss";

const Footer: FC = () => {
  const githubLink = (
    <Link href="https://github.com/ednoram">
      <a target="_blank" rel="noreferrer">
        @ednoram
      </a>
    </Link>
  );

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className="flex_center">
          <div className={styles.footer__logo}>
            <Image width={48} height={48} src="/logo.svg" />
            <p className={styles.footer__logo_text}>Read</p>
          </div>
          <p className={styles.footer__author_text}>By {githubLink}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
