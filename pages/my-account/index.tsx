import { NextPage } from "next";

import { Layout } from "@components";
import { useProtectRoute } from "@hooks";
import { MyAccountContainer } from "@containers";

const PAGE_TITLE = "My Account";
const PAGE_DESCRIPTION = "My account page";

const MyAccount: NextPage = () => {
  useProtectRoute(true);

  return (
    <Layout title={PAGE_TITLE} description={PAGE_DESCRIPTION}>
      <MyAccountContainer />
    </Layout>
  );
};

export default MyAccount;
