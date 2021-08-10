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
    }
  }
`;
