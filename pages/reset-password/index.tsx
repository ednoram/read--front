import { NextPage } from "next";

import { Layout } from "@components";
import { useProtectRoute } from "@hooks";
import { ResetPasswordEmailContainer } from "@containers";

const PAGE_TITLE = "Send Reset Password Email";
const PAGE_DESCRIPTION = "Send reset password email page";

const ResetPassword: NextPage = () => {
  useProtectRoute(false);

  return (
    <Layout title={PAGE_TITLE} description={PAGE_DESCRIPTION}>
      <ResetPasswordEmailContainer />
    </Layout>
  );
};

export default ResetPassword;
