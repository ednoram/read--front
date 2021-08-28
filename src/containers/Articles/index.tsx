import { FC } from "react";

import { Breadcrumbs } from "@components";
import { ARTICLES_ROUTE } from "@constants";

import ListSection from "./ListSection";

const breadcrumbsLinks = [
  { text: "Home", href: "/" },
  { text: "Articles", href: ARTICLES_ROUTE },
];

const Articles: FC = () => {
  return (
    <div className="container">
      <Breadcrumbs links={breadcrumbsLinks} />
      <section>
        <h1 className="page_title">Articles</h1>
      </section>
      <ListSection />
    </div>
  );
};

export default Articles;
