import { gql } from "@apollo/client";

export const SEND_VERIFICATION_MUTATION = gql`
  mutation ($userEmail: String!) {
    sendVerificationCode(userEmail: $userEmail) {
      success
    }
  }
`;
