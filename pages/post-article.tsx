import { NextPage } from "next";

import { Layout } from "@components";
import { PostArticleContainer } from "@containers";
import { useConfirmBeforeLeaving, useProtectRoute } from "@hooks";

const PAGE_TITLE = "Post Article";
const PAGE_DESCRIPTION = "Post article page";

const PostArticle: NextPage = () => {
  useProtectRoute(true);
  useConfirmBeforeLeaving();

  return (
    <Layout title={PAGE_TITLE} description={PAGE_DESCRIPTION}>
      <PostArticleContainer />
    </Layout>
  );
};

export default PostArticle;
