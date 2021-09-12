import {
  HttpLink,
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";

import { APOLLO_URI } from "@constants";

const createApolloClient = (): ApolloClient<NormalizedCacheObject> => {
  const link = new HttpLink({
    uri: APOLLO_URI,
    credentials: "include",
  });

  const cache = new InMemoryCache();

  return new ApolloClient({
    link,
    cache,
    ssrMode: typeof window === "undefined",
  });
};

export default createApolloClient;
