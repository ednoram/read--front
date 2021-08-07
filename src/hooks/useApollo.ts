import { useMemo } from "react";
import { ApolloClient, NormalizedCacheObject } from "@apollo/client";

import { initializeApollo } from "@utils";

const useApollo = (
  initialState: unknown
): ApolloClient<NormalizedCacheObject> => {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
};

export default useApollo;
