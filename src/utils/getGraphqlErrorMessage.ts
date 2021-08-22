import { ApolloError } from "@apollo/client";

const getGraphqlErrorMessage = (
  error: ApolloError | undefined
): string | null => {
  if (!error) return null;

  const graphQLErrors = error?.graphQLErrors;
  const errorMessage = graphQLErrors ? graphQLErrors[0]?.message : null;

  return errorMessage;
};

export default getGraphqlErrorMessage;
