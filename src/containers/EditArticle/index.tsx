import { FC } from "react";

import { IArticle } from "@types";
import { ArticleForm } from "@components";

interface Props {
  article: IArticle;
}

const EditArticle: FC<Props> = ({ article }) => {
  return (
    <div className="container">
      <h1 className="page_title">Edit Article</h1>
      <ArticleForm article={article} />
    </div>
  );
};

export default EditArticle;
