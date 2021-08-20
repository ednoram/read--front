import { NextPage } from "next";

import { Layout } from "@components";
import { ChangePasswordContainer } from "@containers";
import { useConfirmBeforeLeaving, useProtectRoute } from "@hooks";

const PAGE_TITLE = "Change Password";
const PAGE_DESCRIPTION = "Change password page";

const ChangePassword: NextPage = () => {
  useProtectRoute(true);
  useConfirmBeforeLeaving();

  return (
    <Layout title={PAGE_TITLE} description={PAGE_DESCRIPTION}>
      <ChangePasswordContainer />
    </Layout>
  );
};

export default ChangePassword;
