import { FC } from "react";

import { LOGIN_ROUTE } from "@constants";
import { useLogoutFunction } from "@hooks";

const MyAccount: FC = () => {
  const logout = useLogoutFunction();

  const handleLogout = () => {
    logout();
    location.href = LOGIN_ROUTE;
  };

  return (
    <div className="container">
      <h1 className="page_title">My Account</h1>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default MyAccount;
