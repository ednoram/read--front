import { gql } from "@apollo/client";

export const LIKE_ARTICLE_MUTATION = gql`
  mutation ($articleId: String!) {
    likeArticle(articleId: $articleId) {
      success
    }
  }
`;

export const UNLIKE_ARTICLE_MUTATION = gql`
  mutation ($articleId: String!) {
    unlikeArticle(articleId: $articleId) {
      success
    }
  }
`;
