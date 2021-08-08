import { gql } from "@apollo/client";

export const LOGIN_WITH_TOKEN_QUERY = gql`
  {
    loginWithToken {
      name
      email
    }
  }
`;
