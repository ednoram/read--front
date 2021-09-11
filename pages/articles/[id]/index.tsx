import { NextPage, GetServerSideProps } from "next";

import { IArticle } from "@types";
import { Layout } from "@components";
import { ARTICLE_QUERY } from "@graphql";
import { createApolloClient } from "@utils";
import { ArticleContainer } from "@containers";

interface Props {
  article: IArticle;
}

const Article: NextPage<Props> = ({ article }) => {
  const PAGE_TITLE = `Article: ${article.title}`;
  const PAGE_DESCRIPTION = "Article page";

  return (
    <Layout title={PAGE_TITLE} description={PAGE_DESCRIPTION}>
      <ArticleContainer article={article} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const articleId = params?.id;
    const apolloClient = createApolloClient();

    const { data } = await apolloClient.query({
      query: ARTICLE_QUERY,
      variables: { _id: articleId },
    });

    const { article } = data;

    return {
      props: { article },
    };
  } catch {
    return { notFound: true };
  }
};

export default Article;
