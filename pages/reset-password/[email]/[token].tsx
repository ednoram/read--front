import { NextPage } from "next";

import { Layout } from "@components";
import { useProtectRoute } from "@hooks";
import { ResetPasswordContainer } from "@containers";

const PAGE_TITLE = "Reset Password";
const PAGE_DESCRIPTION = "Reset password page";

const ResetPassword: NextPage = () => {
  useProtectRoute(false);

  return (
    <Layout title={PAGE_TITLE} description={PAGE_DESCRIPTION}>
      <ResetPasswordContainer />
    </Layout>
  );
};

export default ResetPassword;
