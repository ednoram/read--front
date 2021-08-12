import { gql } from "@apollo/client";

export const LOGIN_WITH_TOKEN_QUERY = gql`
  {
    loginWithToken {
      name
      email
    }
  }
`;

export const ARTICLE_QUERY = gql`
  query ($_id: String!) {
    article(_id: $_id) {
      _id
      body
      title
      userEmail
      createdAt
      updatedAt
    }
  }
`;

export const ARTICLES_QUERY = gql`
  query ($userEmail: String) {
    articles(userEmail: $userEmail) {
      _id
      body
      title
      userEmail
    }
  }
`;

export const USER_QUERY = gql`
  query ($email: String!) {
    user(email: $email) {
      _id
      name
      email
    }
  }
`;

export const USERS_QUERY = gql`
  {
    users {
      _id
      name
      email
    }
  }
`;
