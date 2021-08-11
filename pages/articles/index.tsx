import { NextPage, GetServerSideProps } from "next";

import { IArticle } from "@types";
import { Layout } from "@components";
import { ARTICLES_QUERY } from "@graphql";
import { initializeApollo } from "@utils";
import { ArticlesContainer } from "@containers";

const PAGE_TITLE = "Articles";
const PAGE_DESCRIPTION = "Articles page";

interface Props {
  articles: IArticle[];
}

const Articles: NextPage<Props> = ({ articles }) => {
  return (
    <Layout title={PAGE_TITLE} description={PAGE_DESCRIPTION}>
      <ArticlesContainer articles={articles} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const apolloClient = initializeApollo();

    const { data } = await apolloClient.query({
      query: ARTICLES_QUERY,
    });

    const { articles } = data;

    return {
      props: { articles },
    };
  } catch {
    return { notFound: true };
  }
};

export default Articles;
