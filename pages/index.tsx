import { NextPage } from "next";

import { Layout } from "@components";
import { HomeContainer } from "@containers";

const PAGE_TITLE = "Home";
const PAGE_DESCRIPTION = "Home page";

const Home: NextPage = () => {
  return (
    <Layout title={PAGE_TITLE} description={PAGE_DESCRIPTION}>
      <HomeContainer />
    </Layout>
  );
};

export default Home;
