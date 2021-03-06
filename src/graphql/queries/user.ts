import { gql } from "@apollo/client";

export const LOGIN_WITH_TOKEN_QUERY = gql`
  {
    loginWithToken {
      user {
        name
        email
        about
      }
      token
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
  query ($searchFilter: String, $limit: Int, $offset: Int) {
    users(searchFilter: $searchFilter, limit: $limit, offset: $offset) {
      totalCount
      users {
        _id
        name
        email
        about
      }
    }
  }
`;
