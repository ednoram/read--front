import { gql } from "@apollo/client";

export const COMMENTS_QUERY = gql`
  query ($articleId: String!) {
    comments(articleId: $articleId) {
      _id
      text
      userEmail
    }
  }
`;
