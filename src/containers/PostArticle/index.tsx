import { FC } from "react";

import { ArticleForm } from "@components";

const PostArticle: FC = () => {
  return (
    <div className="container_small">
      <section>
        <h1 className="page_title">Post Article</h1>
      </section>
      <section>
        <ArticleForm />
      </section>
    </div>
  );
};

export default PostArticle;
