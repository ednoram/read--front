import { useMutation } from "@apollo/client";

import { LOGOUT_MUTATION } from "@graphql";

const useLogoutFunction = (): (() => void) => {
  const [logout] = useMutation(LOGOUT_MUTATION, {
    onError: () => localStorage.removeItem("isAuthenticated"),
    onCompleted: () => localStorage.removeItem("isAuthenticated"),
  });

  return logout;
};

export default useLogoutFunction;
