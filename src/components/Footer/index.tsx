import { FC } from "react";

import styles from "./Footer.module.scss";

const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className="flex_center">
          <p className={styles.footer__text}>By @ednoram</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
