import {
  HttpLink,
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { APOLLO_URI } from "@constants";
import { getTokenCookie } from "@utils";

const createApolloClient = (): ApolloClient<NormalizedCacheObject> => {
  const httpLink = new HttpLink({
    uri: APOLLO_URI,
    credentials: "include",
  });

  const authLink = setContext((_, { headers }) => {
    const token = getTokenCookie();

    return {
      headers: {
        ...headers,
        authorization: token || "",
      },
    };
  });

  const cache = new InMemoryCache();

  return new ApolloClient({
    cache,
    link: authLink.concat(httpLink),
  });
};

export default createApolloClient;
