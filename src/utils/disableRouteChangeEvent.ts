import { Router } from "next/router";

import { handleRouteChange } from "@utils";

const disableRouteChangeEvent = (): void => {
  window.onbeforeunload = null;
  Router.events.off("routeChangeStart", handleRouteChange);
};

export default disableRouteChangeEvent;
