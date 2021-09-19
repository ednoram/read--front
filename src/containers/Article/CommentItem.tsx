import { useState, FC, Dispatch, SetStateAction } from "react";
import Link from "next/link";

import { IComment } from "@types";
import { useGetUser } from "@hooks";
import { USERS_ROUTE } from "@constants";
import EditIcon from "@assets/EditIcon.svg";

import styles from "./Article.module.scss";
import CommentForm from "./CommentForm";

interface Props {
  comment: IComment;
  setTotalCount: Dispatch<SetStateAction<number>>;
  setComments: Dispatch<SetStateAction<IComment[]>>;
}

const CommentItem: FC<Props> = ({ comment, setComments, setTotalCount }) => {
  const [editing, setEditing] = useState(false);

  const user = useGetUser();

  const commentDate = new Date(Number(comment.updatedAt)).toLocaleDateString(
    "en",
    {
      month: "short",
      year: "numeric",
      day: "numeric",
    }
  );

  const editButton = user?.email === comment?.userEmail && (
    <button
      onClick={() => setEditing(true)}
      className={styles.comments__edit_button}
    >
      <EditIcon className={styles.comments__edit_icon} />
      Edit
    </button>
  );

  const userLink = (
    <Link href={`${USERS_ROUTE}/${comment?.userEmail}`}>
      <a className={styles.comments__user_email}>{comment?.userEmail}</a>
    </Link>
  );

  return editing ? (
    <CommentForm
      comment={comment}
      setEditing={setEditing}
      setComments={setComments}
      setTotalCount={setTotalCount}
    />
  ) : (
    <div>
      <p>{comment?.text}</p>
      <p className={styles.comments__date_p}>{commentDate}</p>
      {editButton}
      <div>{userLink}</div>
    </div>
  );
};

export default CommentItem;
