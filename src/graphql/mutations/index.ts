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
