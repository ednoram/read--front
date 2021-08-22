import { gql } from "@apollo/client";

export const POST_COMMENT_MUTATION = gql`
  mutation ($articleId: String!, $text: String!) {
    postComment(articleId: $articleId, text: $text) {
      _id
      text
      userEmail
    }
  }
`;

export const UPDATE_COMMENT_MUTATION = gql`
  mutation ($_id: String!, $text: String!) {
    updateComment(_id: $_id, text: $text) {
      _id
      text
      userEmail
    }
  }
`;

export const DELETE_COMMENT_MUTATION = gql`
  mutation ($_id: String!) {
    deleteComment(_id: $_id) {
      _id
    }
  }
`;
