import { FC } from "react";

import { IArticle } from "@types";
import { ArticleForm } from "@components";

interface Props {
  article: IArticle;
}

const EditArticle: FC<Props> = ({ article }) => {
  return (
    <div className="container_small">
      <section>
        <h1 className="page_title">Edit Article</h1>
      </section>

      <section>
        <ArticleForm article={article} />
      </section>
    </div>
  );
};

export default EditArticle;
