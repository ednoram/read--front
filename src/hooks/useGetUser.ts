import { useQuery } from "@apollo/client";

import { IUser } from "@types";
import { LOGIN_WITH_TOKEN_QUERY } from "@graphql";

const useGetUser = (): IUser => {
  const { data } = useQuery(LOGIN_WITH_TOKEN_QUERY, {
    onError: () => {},
  });

  return data?.loginWithToken || null;
};

export default useGetUser;
