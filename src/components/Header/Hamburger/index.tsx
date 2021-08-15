import { FC, Dispatch, SetStateAction } from "react";

import styles from "./Hamburger.module.scss";

interface Props {
  menuIsOpen: boolean;
  setMenuIsOpen: Dispatch<SetStateAction<boolean>>;
}

const Hamburger: FC<Props> = ({ menuIsOpen, setMenuIsOpen }) => {
  const handleClick = () => {
    if (window.scrollY !== 0) {
      window.scroll(0, 0);
    }

    setMenuIsOpen(!menuIsOpen);
  };

  return (
    <div
      onClick={handleClick}
      className={`${styles.container} ${menuIsOpen ? styles.change : ""}`}
    >
      <div className={styles.bar1}></div>
      <div className={styles.bar2}></div>
      <div className={styles.bar3}></div>
    </div>
  );
};

export default Hamburger;
