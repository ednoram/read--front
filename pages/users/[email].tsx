import { NextPage, GetServerSideProps } from "next";
import { useQuery } from "@apollo/client";

import { USER_QUERY } from "@graphql";
import { Layout, Loader } from "@components";
import { UserContainer, Custom404Container } from "@containers";

interface Props {
  email: string;
}

const User: NextPage<Props> = ({ email }) => {
  const { data: userData, loading } = useQuery(USER_QUERY, {
    onError: () => {},
    variables: { email },
  });

  const user = userData?.user;

  const PAGE_TITLE = `User: ${user ? user?.name : ""}`;
  const PAGE_DESCRIPTION = "User page";

  const loadingDiv = (
    <div className="loading_page_div">
      <Loader />
    </div>
  );

  return !loading && !user ? (
    <Layout noHeaderAndFooter title={PAGE_TITLE} description={PAGE_DESCRIPTION}>
      <Custom404Container />
    </Layout>
  ) : (
    <Layout title={PAGE_TITLE} description={PAGE_DESCRIPTION}>
      {loading && loadingDiv}
      {!loading && user && <UserContainer user={user} />}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const email = params?.email;

    return {
      props: { email },
    };
  } catch {
    return { notFound: true };
  }
};

export default User;
