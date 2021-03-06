import { NextPage } from "next";

import { Layout } from "@components";
import { useGetUser, useProtectRoute } from "@hooks";
import { MyAccountContainer } from "@containers";

const PAGE_TITLE = "My Account";
const PAGE_DESCRIPTION = "My account page";

const MyAccount: NextPage = () => {
  const user = useGetUser();
  useProtectRoute(true);

  return (
    <Layout title={PAGE_TITLE} description={PAGE_DESCRIPTION}>
      {user && <MyAccountContainer />}
    </Layout>
  );
};

export default MyAccount;
