import { useState, FC } from "react";
import { nanoid } from "nanoid";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";

import { IComment } from "@types";
import { Loader } from "@components";
import { COMMENTS_QUERY } from "@graphql";

import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import styles from "./Article.module.scss";

const Comments: FC = () => {
  const [comments, setComments] = useState<IComment[]>([]);
  const { query } = useRouter();

  const { loading: loadingComments } = useQuery(COMMENTS_QUERY, {
    fetchPolicy: "no-cache",
    variables: { articleId: query.id },
    onCompleted: (data) => setComments(data.comments),
  });

  const loadingDiv = loadingComments && (
    <div className="loading_div">
      <Loader />
    </div>
  );

  const listItems =
    comments &&
    comments.length > 0 &&
    comments.map((comment) => (
      <li key={nanoid()}>
        <CommentItem comment={comment} setComments={setComments} />
      </li>
    ));

  return (
    <div className={styles.comments}>
      <h2 className={styles.comments__title}>
        Comments {!loadingComments && `(${comments.length})`}
      </h2>
      <div className={styles.comments__form_and_list}>
        <CommentForm setComments={setComments} />
        {loadingDiv}
        {comments && comments?.length > 0 && (
          <ul className={styles.comments__list}>{listItems}</ul>
        )}
      </div>
    </div>
  );
};

export default Comments;
