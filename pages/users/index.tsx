import { NextPage, GetServerSideProps } from "next";

import { IUser } from "@types";
import { Layout } from "@components";
import { USERS_QUERY } from "@graphql";
import { initializeApollo } from "@utils";
import { UsersContainer } from "@containers";

const PAGE_TITLE = "Articles";
const PAGE_DESCRIPTION = "Articles page";

interface Props {
  users: IUser[];
}

const Users: NextPage<Props> = ({ users }) => {
  return (
    <Layout title={PAGE_TITLE} description={PAGE_DESCRIPTION}>
      <UsersContainer users={users} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const apolloClient = initializeApollo();

    const { data } = await apolloClient.query({
      query: USERS_QUERY,
    });

    const { users } = data;

    return {
      props: { users },
    };
  } catch {
    return { notFound: true };
  }
};

export default Users;
