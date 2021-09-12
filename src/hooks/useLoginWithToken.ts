import { useQuery } from "@apollo/client";

import { LOGIN_WITH_TOKEN_QUERY } from "@graphql";
import { removeTokenCookie, setTokenCookie } from "@utils";

const useLoginWithToken = (): void => {
  useQuery(LOGIN_WITH_TOKEN_QUERY, {
    fetchPolicy: "no-cache",
    onError: () => {
      localStorage.removeItem("isAuthenticated");
      removeTokenCookie();
    },
    onCompleted: (data) => {
      const token = data.loginWithToken?.token;
      if (token && typeof token === "string") {
        localStorage.setItem("isAuthenticated", "yes");
        setTokenCookie(token);
      } else {
        localStorage.removeItem("isAuthenticated");
      }
    },
  });
};

export default useLoginWithToken;
