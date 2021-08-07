import {
  HttpLink,
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";

import { APOLLO_URI } from "@constants";

let apolloClient: ApolloClient<NormalizedCacheObject>;

const createApolloClient = () => {
  const link = new HttpLink({ uri: APOLLO_URI, credentials: "include" });
  const cache = new InMemoryCache();

  return new ApolloClient({
    link,
    cache,
    ssrMode: typeof window === "undefined",
  });
};

const initializeApollo = (
  initialState: unknown = null
): ApolloClient<NormalizedCacheObject> => {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (typeof initialState === "object") {
    const existingCache = _apolloClient.extract();
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }

  if (!apolloClient && typeof window !== "undefined") {
    apolloClient = _apolloClient;
  }

  return _apolloClient;
};

export default initializeApollo;
