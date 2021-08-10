import { gql } from "@apollo/client";

export const LOG_IN_MUTATION = gql`
  mutation ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      name
      email
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation (
    $name: String!
    $email: String!
    $password: String!
    $passwordConfirmation: String!
  ) {
    register(
      name: $name
      email: $email
      password: $password
      passwordConfirmation: $passwordConfirmation
    ) {
      _id
    }
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation {
    logout {
      success
    }
  }
`;

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
