import { ReactNode } from "react";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";

import "@styles/index.scss";
import { useApollo, useLoginWithToken } from "@hooks";

const App = ({ Component, pageProps }: AppProps): ReactNode => {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
      <RefreshLoginComponent />
    </ApolloProvider>
  );
};

const RefreshLoginComponent = () => {
  useLoginWithToken();
  return <></>;
};

export default App;
