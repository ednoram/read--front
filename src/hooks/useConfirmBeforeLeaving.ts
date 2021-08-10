import { useEffect } from "react";
import Router from "next/router";

import { handleRouteChange, disableRouteChangeEvent } from "@utils";

const useConfirmBeforeLeaving = (): void => {
  useEffect((): (() => void) => {
    window.onbeforeunload = () => true;
    Router.events.on("routeChangeStart", handleRouteChange);

    return () => disableRouteChangeEvent();
  }, []);
};

export default useConfirmBeforeLeaving;
