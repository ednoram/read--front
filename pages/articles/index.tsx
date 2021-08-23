import { NextPage } from "next";

import { Layout } from "@components";
import { ArticlesContainer } from "@containers";

const PAGE_TITLE = "Articles";
const PAGE_DESCRIPTION = "Articles page";

const Articles: NextPage = () => {
  return (
    <Layout title={PAGE_TITLE} description={PAGE_DESCRIPTION}>
      <ArticlesContainer />
    </Layout>
  );
};

export default Articles;
