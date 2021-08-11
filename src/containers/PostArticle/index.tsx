import { FC } from "react";

import { ArticleForm } from "@components";

const PostArticle: FC = () => {
  return (
    <div className="container_small">
      <h1 className="page_title">Post Article</h1>
      <ArticleForm />
    </div>
  );
};

export default PostArticle;
