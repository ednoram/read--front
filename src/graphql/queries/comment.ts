import { gql } from "@apollo/client";

export const COMMENTS_QUERY = gql`
  query ($articleId: String!, $limit: Int, $offset: Int) {
    comments(articleId: $articleId, limit: $limit, offset: $offset) {
      totalCount
      comments {
        _id
        text
        userEmail
      }
    }
  }
`;
