interface IComment {
  _id: string;
  text: string;
  articleId: string;
  userEmail: string;
  createdAt: string;
  updatedAt: string;
}

export default IComment;
