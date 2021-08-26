import { useEffect } from "react";
import { useRouter } from "next/router";
import { ApolloClient, NormalizedCacheObject } from "@apollo/client";

const useRefreshApolloStore = (
  apolloClient: ApolloClient<NormalizedCacheObject>
): void => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      apolloClient.resetStore();
    });

    return () => clearTimeout(timer);
  }, [router]);
};

export default useRefreshApolloStore;
