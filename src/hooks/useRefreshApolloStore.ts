import { useEffect } from "react";
import { useRouter } from "next/router";
import { ApolloClient, NormalizedCacheObject } from "@apollo/client";

import { RESET_PASSWORD_ROUTE } from "@constants";

const useRefreshApolloStore = (
  apolloClient: ApolloClient<NormalizedCacheObject>
): void => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!router.pathname.includes(RESET_PASSWORD_ROUTE)) {
        apolloClient.resetStore();
      }
    });

    return () => clearTimeout(timer);
  }, [router]);
};

export default useRefreshApolloStore;
