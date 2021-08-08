import { useQuery } from "@apollo/client";

import { useLogoutFunction } from "@hooks";
import { LOGIN_WITH_TOKEN_QUERY } from "@graphql";

const useLoginWithToken = (): void => {
  const logout = useLogoutFunction();

  useQuery(LOGIN_WITH_TOKEN_QUERY, {
    onError: () => logout(),
    onCompleted: (data: unknown) => {
      if (!data) logout();
    },
  });
};

export default useLoginWithToken;
