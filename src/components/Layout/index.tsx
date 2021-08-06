import { FC, ReactNode } from "react";
import Head from "next/head";

import { Header, Footer } from "@components";

import styles from "./Layout.module.scss";

interface Props {
  title: string;
  description: string;
  children?: ReactNode;
  noHeaderAndFooter?: boolean;
}

const Layout: FC<Props> = ({
  title,
  description,
  children,
  noHeaderAndFooter,
}) => {
  return (
    <>
      <Head>
        <title>{title + " | Read"}</title>
        <meta name="description" content={description} />
      </Head>
      {noHeaderAndFooter ? (
        <main>{children}</main>
      ) : (
        <>
          <Header />
          <main className={styles.main}>{children}</main>
          <Footer />
        </>
      )}
    </>
  );
};

export default Layout;