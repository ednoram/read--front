import { NextPage } from "next";

import { Layout } from "@components";
import { EditAccountContainer } from "@containers";
import { useConfirmBeforeLeaving, useProtectRoute } from "@hooks";

const PAGE_TITLE = "Edit Account";
const PAGE_DESCRIPTION = "Edit account page";

const EditAccount: NextPage = () => {
  useProtectRoute(true);
  useConfirmBeforeLeaving();

  return (
    <Layout title={PAGE_TITLE} description={PAGE_DESCRIPTION}>
      <EditAccountContainer />
    </Layout>
  );
};

export default EditAccount;
