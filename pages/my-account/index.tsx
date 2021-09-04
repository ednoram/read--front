import { NextPage } from "next";

import { Layout } from "@components";
import { useIsAuthenticated, useProtectRoute } from "@hooks";
import { MyAccountContainer } from "@containers";

const PAGE_TITLE = "My Account";
const PAGE_DESCRIPTION = "My account page";

const MyAccount: NextPage = () => {
  const isAuthenticated = useIsAuthenticated();
  useProtectRoute(true);

  return isAuthenticated ? (
    <Layout title={PAGE_TITLE} description={PAGE_DESCRIPTION}>
      <MyAccountContainer />
    </Layout>
  ) : (
    <></>
  );
};

export default MyAccount;
