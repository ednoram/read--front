import { NextPage, GetServerSideProps } from "next";
import { useQuery } from "@apollo/client";

import { ARTICLE_QUERY } from "@graphql";
import { Layout, Loader } from "@components";
import { ArticleContainer, Custom404Container } from "@containers";

interface Props {
  articleId: string;
}

const Article: NextPage<Props> = ({ articleId }) => {
  const { data: articleData, loading } = useQuery(ARTICLE_QUERY, {
    onError: () => {},
    variables: { _id: articleId },
  });

  const article = articleData?.article;

  const PAGE_TITLE = `Article: ${article ? article?.title : ""}`;
  const PAGE_DESCRIPTION = "Article page";

  const loadingDiv = (
    <div className="loading_page_div">
      <Loader />
    </div>
  );

  return !loading && !article ? (
    <Layout noHeaderAndFooter title={PAGE_TITLE} description={PAGE_DESCRIPTION}>
      <Custom404Container />
    </Layout>
  ) : (
    <Layout title={PAGE_TITLE} description={PAGE_DESCRIPTION}>
      {loading && loadingDiv}
      {!loading && article && <ArticleContainer article={article} />}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const articleId = params?.id;

    return {
      props: { articleId },
    };
  } catch {
    return { notFound: true };
  }
};

export default Article;
