import { NextPage } from "next";

import { Layout } from "@components";
import { HomeContainer } from "@containers";

const PAGE_TITLE =
  "Read | A place where you can learn and share your knowledge";
const PAGE_DESCRIPTION =
  "A place where you can learn and share your knowledge.";

const Home: NextPage = () => {
  return (
    <Layout
      exactTitle
      noTopPadding
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
    >
      <HomeContainer />
    </Layout>
  );
};

export default Home;
