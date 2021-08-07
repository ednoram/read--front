import { ReactNode } from "react";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";

import "@styles/index.scss";
import { useApollo } from "@hooks";

const App = ({ Component, pageProps }: AppProps): ReactNode => {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default App;
