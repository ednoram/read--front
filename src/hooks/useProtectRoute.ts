import { useEffect } from "react";
import { useRouter } from "next/router";

import { useIsAuthenticated } from "@hooks";

const useProtectRoute = (whenAuthenticated: boolean): void => {
  const isAuthenticated = useIsAuthenticated();
  const router = useRouter();

  useEffect(() => {
    if (
      (whenAuthenticated && isAuthenticated === false) ||
      (!whenAuthenticated && isAuthenticated === true)
    ) {
      router.push("/");
    }
  }, [isAuthenticated]);
};

export default useProtectRoute;
