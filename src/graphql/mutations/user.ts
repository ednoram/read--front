import { gql } from "@apollo/client";

export const LOG_IN_MUTATION = gql`
  mutation ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
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
      success
    }
  }
`;

export const UPDATE_USER_MUTATION = gql`
  mutation ($name: String!, $about: String!) {
    updateUser(name: $name, about: $about) {
      name
      about
    }
  }
`;

export const VERIFY_ACCOUNT_MUTATION = gql`
  mutation ($userEmail: String!, $code: String!) {
    verifyAccount(userEmail: $userEmail, code: $code) {
      success
    }
  }
`;
