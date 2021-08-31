interface IArticle {
  _id: string;
  body: string;
  title: string;
  userEmail: string;
  createdAt: string;
  updatedAt: string;
  likesCount: number;
  isLiked?: boolean | null;
  isSaved?: boolean | null;
}

export default IArticle;
