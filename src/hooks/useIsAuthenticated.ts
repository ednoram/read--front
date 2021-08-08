import { useState, useEffect } from "react";

import { useLogoutFunction } from "@hooks";

const useIsAuthenticated = (): boolean | null => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const logout = useLogoutFunction();

  useEffect(() => {
    if (localStorage.getItem("isAuthenticated")) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      logout();
    }
  }, []);

  return isAuthenticated;
};

export default useIsAuthenticated;
