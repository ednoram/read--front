import { Router } from "next/router";

const confirmMessage = "Are you sure you want to leave the page?";

const handleRouteChange = (): void => {
  if (!confirm(confirmMessage)) {
    Router.events.emit("routeChangeError");
    throw "Route Change aborted. This can be safely ignored.";
  }
};

export default handleRouteChange;
