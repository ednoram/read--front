import { gql } from "@apollo/client";

export const SEND_PASSWORD_EMAIL_MUTATION = gql`
  mutation ($userEmail: String!) {
    sendResetPasswordEmail(userEmail: $userEmail) {
      success
    }
  }
`;

export const RESET_PASSWORD_MUTATION = gql`
  mutation (
    $token: String!
    $userEmail: String!
    $newPassword: String!
    $passwordConfirmation: String!
  ) {
    resetPassword(
      token: $token
      userEmail: $userEmail
      newPassword: $newPassword
      passwordConfirmation: $passwordConfirmation
    ) {
      success
    }
  }
`;
