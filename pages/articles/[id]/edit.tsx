import { NextPage, GetServerSideProps } from "next";

import { IArticle } from "@types";
import { Layout } from "@components";
import { ARTICLE_QUERY } from "@graphql";
import { createApolloClient } from "@utils";
import { EditArticleContainer } from "@containers";
import { useGetUser, useProtectRoute, useConfirmBeforeLeaving } from "@hooks";

const PAGE_TITLE = "Edit Article";
const PAGE_DESCRIPTION = "Edit article page";

interface Props {
  article: IArticle;
}

const EditArticle: NextPage<Props> = ({ article }) => {
  const user = useGetUser();
  const pageIsProtected = !(user && user.email === article.userEmail);

  useProtectRoute(true, pageIsProtected);
  useConfirmBeforeLeaving();

  return (
    <Layout title={PAGE_TITLE} description={PAGE_DESCRIPTION}>
      <EditArticleContainer article={article} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const apolloClient = createApolloClient();

    const { data } = await apolloClient.query({
      query: ARTICLE_QUERY,
      variables: { _id: params?.id },
    });

    const { article } = data;

    return {
      props: { article },
    };
  } catch {
    return { notFound: true };
  }
};

export default EditArticle;
