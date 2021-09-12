import { NextPage, GetServerSideProps } from "next";
import { useQuery } from "@apollo/client";

import { ARTICLE_QUERY } from "@graphql";
import { Layout, Loader } from "@components";
import { EditArticleContainer, Custom404Container } from "@containers";
import { useGetUser, useProtectRoute, useConfirmBeforeLeaving } from "@hooks";

const PAGE_TITLE = "Edit Article";
const PAGE_DESCRIPTION = "Edit article page";

interface Props {
  articleId: string;
}

const EditArticle: NextPage<Props> = ({ articleId }) => {
  const { data: articleData, loading } = useQuery(ARTICLE_QUERY, {
    onError: () => {},
    variables: { _id: articleId },
  });

  const user = useGetUser();

  const article = articleData?.article;
  const pageIsProtected = !(
    user &&
    article &&
    user.email === article.userEmail
  );

  useProtectRoute(true, pageIsProtected);
  useConfirmBeforeLeaving();

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
      {!loading && article && <EditArticleContainer article={article} />}
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

export default EditArticle;
