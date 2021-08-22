import { useState, FC, Dispatch, SetStateAction } from "react";
import Link from "next/link";

import { IComment } from "@types";
import { USERS_ROUTE } from "@constants";

import styles from "./Article.module.scss";
import { useGetUser } from "@hooks";
import CommentForm from "./CommentForm";

interface Props {
  comment: IComment;
  setComments: Dispatch<SetStateAction<IComment[]>>;
}

const CommentItem: FC<Props> = ({ comment, setComments }) => {
  const [editing, setEditing] = useState(false);

  const user = useGetUser();

  const editButton = user.email === comment?.userEmail && (
    <button
      onClick={() => setEditing(true)}
      className={styles.comments__edit_button}
    >
      Edit Comment
    </button>
  );

  return editing ? (
    <CommentForm
      comment={comment}
      setEditing={setEditing}
      setComments={setComments}
    />
  ) : (
    <div>
      <p>{comment?.text}</p>
      {editButton}
      <div>
        <Link href={`${USERS_ROUTE}/${comment?.userEmail}`}>
          <a className={styles.comments__list_user_email}>
            {comment?.userEmail}
          </a>
        </Link>
      </div>
    </div>
  );
};

export default CommentItem;
