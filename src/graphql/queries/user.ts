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

export const USER_QUERY = gql`
  query ($email: String!) {
    user(email: $email) {
      _id
      name
      email
      about
    }
  }
`;

export const USERS_QUERY = gql`
  {
    users {
      _id
      name
      email
      about
    }
  }
`;
