import { NextPage } from "next";

import { Layout } from "@components";
import { useProtectRoute } from "@hooks";
import { LoginContainer } from "@containers";

const PAGE_TITLE = "Log In";
const PAGE_DESCRIPTION =
  "A place where you can learn and share your knowledge.";

const Login: NextPage = () => {
  useProtectRoute(false);

  return (
    <Layout noHeaderAndFooter title={PAGE_TITLE} description={PAGE_DESCRIPTION}>
      <LoginContainer />
    </Layout>
  );
};

export default Login;
