import { gql } from "@apollo/client";

export const POST_ARTICLE_MUTATION = gql`
  mutation ($title: String!, $body: String!) {
    postArticle(title: $title, body: $body) {
      _id
    }
  }
`;

export const UPDATE_ARTICLE_MUTATION = gql`
  mutation ($_id: String!, $title: String!, $body: String!) {
    updateArticle(_id: $_id, title: $title, body: $body) {
      _id
    }
  }
`;

export const DELETE_ARTICLE_MUTATION = gql`
  mutation ($_id: String!) {
    deleteArticle(_id: $_id) {
      success
    }
  }
`;

export const SAVE_ARTICLE_MUTATION = gql`
  mutation ($articleId: String!) {
    saveArticle(articleId: $articleId) {
      success
    }
  }
`;

export const REMOVE_SAVED_ARTICLE_MUTATION = gql`
  mutation ($articleId: String!) {
    removeSavedArticle(articleId: $articleId) {
      success
    }
  }
`;

export const CHANGE_PASSWORD_MUTATION = gql`
  mutation (
    $newPassword: String!
    $currentPassword: String!
    $passwordConfirmation: String!
  ) {
    changeUserPassword(
      newPassword: $newPassword
      currentPassword: $currentPassword
      passwordConfirmation: $passwordConfirmation
    ) {
      success
    }
  }
`;
