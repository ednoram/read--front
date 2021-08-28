import { NextPage } from "next";

import { Layout } from "@components";
import { UsersContainer } from "@containers";

const PAGE_TITLE = "Articles";
const PAGE_DESCRIPTION = "Articles page";

const Users: NextPage = () => {
  return (
    <Layout title={PAGE_TITLE} description={PAGE_DESCRIPTION}>
      <UsersContainer />
    </Layout>
  );
};

export default Users;
