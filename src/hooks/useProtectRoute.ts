import { useEffect } from "react";
import { useRouter } from "next/router";

import { useIsAuthenticated } from "@hooks";
import { disableRouteChangeEvent } from "@utils";

const useProtectRoute = (whenAuthenticated: boolean, enabled = true): void => {
  const isAuthenticated = useIsAuthenticated();
  const router = useRouter();

  useEffect(() => {
    if (
      enabled &&
      ((whenAuthenticated && isAuthenticated === false) ||
        (!whenAuthenticated && isAuthenticated === true))
    ) {
      disableRouteChangeEvent();
      router.push("/");
    }
  }, [isAuthenticated]);
};

export default useProtectRoute;
