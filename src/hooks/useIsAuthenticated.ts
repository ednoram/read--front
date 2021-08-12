import { useState, useEffect } from "react";

const useIsAuthenticated = (): boolean | null => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    if (localStorage.getItem("isAuthenticated")) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return isAuthenticated;
};

export default useIsAuthenticated;
