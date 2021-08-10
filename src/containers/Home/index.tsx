import { FC } from "react";

import styles from "./Home.module.scss";

const Home: FC = () => {
  return (
    <div className="container">
      <h1 className={`page_title ${styles.title}`}>Home</h1>
    </div>
  );
};

export default Home;
