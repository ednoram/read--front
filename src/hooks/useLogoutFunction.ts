import { useMutation } from "@apollo/client";

import { LOGIN_ROUTE } from "@constants";
import { LOGOUT_MUTATION } from "@graphql";

const useLogoutFunction = (): (() => void) => {
  const [logout] = useMutation(LOGOUT_MUTATION, {
    onError: () => {
      localStorage.removeItem("isAuthenticated");
      alert("Something went wrong.");
    },
    onCompleted: () => {
      localStorage.removeItem("isAuthenticated");
      location.href = LOGIN_ROUTE;
    },
  });

  return logout;
};

export default useLogoutFunction;
