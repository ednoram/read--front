import { FC } from "react";

import styles from "./Loader.module.scss";

interface Props {
  className?: string;
}

const Loader: FC<Props> = ({ className }) => {
  return (
    <div className={`${styles.lds_spinner} ${className || ""}`}>
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
