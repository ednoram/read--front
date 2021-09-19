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

const LIMIT = 5;

const Comments: FC = () => {
  const [refetch, setRefetch] = useState(0);
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [comments, setComments] = useState<IComment[]>([]);

  const { query } = useRouter();

  const { data: commentsData, loading: loadingComments } = useQuery(
    COMMENTS_QUERY,
    {
      fetchPolicy: "no-cache",
      variables: { articleId: query.id, limit: LIMIT, offset, refetch },
      onCompleted: (data) => {
        if (data.comments) {
          setComments([...comments, ...data.comments.comments]);
          setTotalCount(commentsData.comments.totalCount);
        }
      },
      onError: () => alert("Something went wrong."),
    }
  );

  const loadingDiv = loadingComments && (
    <div className={`loading_div ${styles.comments__loading_comments_div}`}>
      <Loader />
    </div>
  );

  const listItems =
    comments &&
    comments.length > 0 &&
    comments.map((comment) => (
      <li key={nanoid()}>
        <CommentItem
          comment={comment}
          setComments={setComments}
          setTotalCount={setTotalCount}
        />
      </li>
    ));

  const showMoreButton = comments.length < totalCount && !loadingComments && (
    <div className="flex_center">
      <button
        onClick={() => {
          setOffset(comments.length);
          if (offset === 0 && comments.length === 0) {
            setRefetch((state) => state + 1);
          }
        }}
        className={styles.comments__show_more_button}
      >
        Show More
      </button>
    </div>
  );

  return (
    <div className={styles.comments}>
      <h2 className={styles.comments__title}>
        Comments {!loadingComments && `(${totalCount})`}
      </h2>
      <div className={styles.comments__form_and_list}>
        <CommentForm setTotalCount={setTotalCount} setComments={setComments} />
        {comments && comments?.length > 0 && (
          <ul className={styles.comments__list}>{listItems}</ul>
        )}
        {loadingDiv}
        {showMoreButton}
      </div>
    </div>
  );
};

export default Comments;
