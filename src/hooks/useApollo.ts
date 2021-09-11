import { useMemo } from "react";
import { useRouter } from "next/router";
import { ApolloClient, NormalizedCacheObject } from "@apollo/client";

import { createApolloClient } from "@utils";

const useApollo = (): ApolloClient<NormalizedCacheObject> => {
  const { pathname } = useRouter();

  const store = useMemo(() => createApolloClient(), [pathname]);

  return store;
};

export default useApollo;
