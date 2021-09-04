import { FC, ReactNode } from "react";
import Head from "next/head";

import { Header, Footer } from "@components";

import styles from "./Layout.module.scss";

interface Props {
  title: string;
  description: string;
  children?: ReactNode;
  exactTitle?: boolean;
  noTopPadding?: boolean;
  noHeaderAndFooter?: boolean;
}

const Layout: FC<Props> = ({
  title,
  children,
  exactTitle,
  description,
  noTopPadding,
  noHeaderAndFooter,
}) => {
  const mainClassName = `${styles.main} ${
    noTopPadding ? styles.no_top_padding : ""
  }`;

  return (
    <>
      <Head>
        <title>{exactTitle ? title : `${title} | Read`}</title>
        <meta name="description" content={description} />
      </Head>
      {noHeaderAndFooter ? (
        <main>{children}</main>
      ) : (
        <>
          <Header />
          <main className={mainClassName}>{children}</main>
          <Footer />
        </>
      )}
    </>
  );
};

export default Layout;
