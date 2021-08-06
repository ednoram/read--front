import { ReactNode } from "react";
import type { AppProps } from "next/app";

import "@styles/index.scss";

const App = ({ Component, pageProps }: AppProps): ReactNode => {
  return <Component {...pageProps} />;
};

export default App;
