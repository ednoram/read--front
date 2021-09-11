import { NextPage, GetServerSideProps } from "next";

import { IUser } from "@types";
import { Layout } from "@components";
import { USER_QUERY } from "@graphql";
import { UserContainer } from "@containers";
import { createApolloClient } from "@utils";

const PAGE_TITLE = "User";
const PAGE_DESCRIPTION = "User page";

interface Props {
  user: IUser;
}

const User: NextPage<Props> = ({ user }) => {
  return (
    <Layout title={PAGE_TITLE} description={PAGE_DESCRIPTION}>
      <UserContainer user={user} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const userEmail = params?.email;
    const apolloClient = createApolloClient();

    const { data } = await apolloClient.query({
      query: USER_QUERY,
      variables: { email: userEmail },
    });

    const { user } = data;

    return {
      props: { user },
    };
  } catch {
    return { notFound: true };
  }
};

export default User;
