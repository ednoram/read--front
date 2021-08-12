import { useQuery } from "@apollo/client";

import { LOGIN_WITH_TOKEN_QUERY } from "@graphql";

const useLoginWithToken = (): void => {
  useQuery(LOGIN_WITH_TOKEN_QUERY, {
    fetchPolicy: "no-cache",
    onError: () => {
      localStorage.removeItem("isAuthenticated");
    },
  });
};

export default useLoginWithToken;
