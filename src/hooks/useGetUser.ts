import { useQuery } from "@apollo/client";

import { IUser } from "@types";
import { LOGIN_WITH_TOKEN_QUERY } from "@graphql";
import { setTokenCookie, removeTokenCookie } from "@utils";

const useGetUser = (): IUser => {
  const { data } = useQuery(LOGIN_WITH_TOKEN_QUERY, {
    onError: () => {
      localStorage.removeItem("isAuthenticated");
      removeTokenCookie();
    },
    onCompleted: (data) => {
      const token = data?.loginWithToken?.token;
      if (token) {
        localStorage.setItem("isAuthenticated", "yes");
        setTokenCookie(token);
      }
    },
  });

  return data?.loginWithToken?.user || null;
};

export default useGetUser;
