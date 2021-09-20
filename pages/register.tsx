import { NextPage } from "next";

import { Layout } from "@components";
import { useProtectRoute } from "@hooks";
import { RegisterContainer } from "@containers";

const PAGE_TITLE = "Register";
const PAGE_DESCRIPTION =
  "A place where you can learn and share your knowledge.";

const Register: NextPage = () => {
  useProtectRoute(false);

  return (
    <Layout noHeaderAndFooter title={PAGE_TITLE} description={PAGE_DESCRIPTION}>
      <RegisterContainer />
    </Layout>
  );
};

export default Register;
