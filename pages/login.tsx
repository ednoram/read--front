import { NextPage } from "next";

import { Layout } from "@components";
import { LoginContainer } from "@containers";

const PAGE_TITLE = "Log In";
const PAGE_DESCRIPTION = "Login page";

const Login: NextPage = () => {
  return (
    <Layout noHeaderAndFooter title={PAGE_TITLE} description={PAGE_DESCRIPTION}>
      <LoginContainer />
    </Layout>
  );
};

export default Login;
