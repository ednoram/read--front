import { NextPage } from "next";

import { Layout } from "@components";
import { RegisterContainer } from "@containers";

const PAGE_TITLE = "Register";
const PAGE_DESCRIPTION = "Register page";

const Register: NextPage = () => {
  return (
    <Layout noHeaderAndFooter title={PAGE_TITLE} description={PAGE_DESCRIPTION}>
      <RegisterContainer />
    </Layout>
  );
};

export default Register;
