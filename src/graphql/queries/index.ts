import { gql } from "@apollo/client";

export const LOGIN_WITH_TOKEN_QUERY = gql`
  {
    loginWithToken {
      name
      email
      about
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
      name
      email
      about
    }
  }
`;

export const USERS_QUERY = gql`
  {
    users {
      name
      email
      about
    }
  }
`;
