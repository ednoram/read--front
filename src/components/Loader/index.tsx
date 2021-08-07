import { FC } from "react";

import styles from "./Loader.module.scss";

const Loader: FC = () => {
  return (
    <div className={styles.lds_spinner}>
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};

export default Loader;
