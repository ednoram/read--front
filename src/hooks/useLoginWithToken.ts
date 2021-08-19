import { useQuery } from "@apollo/client";

import { LOGIN_WITH_TOKEN_QUERY } from "@graphql";

const useLoginWithToken = (): void => {
  useQuery(LOGIN_WITH_TOKEN_QUERY, {
    fetchPolicy: "no-cache",
    onError: () => {
      localStorage.removeItem("isAuthenticated");
    },
    onCompleted: (data) => {
      if (!data.loginWithToken) {
        localStorage.removeItem("isAuthenticated");
      } else {
        localStorage.setItem("isAuthenticated", "true");
      }
    },
  });
};

export default useLoginWithToken;
