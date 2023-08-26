import React from "react";
import { Navigate } from "react-router-dom";
import NotFound from "../pages/Utility/NotFound";

const AuthMiddleware = (props) => {
  const authUser = JSON.parse(localStorage.getItem("authUser"));

  if (!authUser || !authUser?.user || !authUser?.group) {
    return (
      <Navigate to={{ pathname: "/login", state: { from: props.location } }} />
    );
  }

  return <React.Fragment>{props.children}</React.Fragment>;
};

export const AuthPermMiddleware = ({
  allowedPerms = [],
  children,
  isRoute = false,
}) => {
  const authUser = JSON.parse(localStorage.getItem("authUser"));

  if (!authUser) return null;
  const isAllowed = allowedPerms.includes(authUser?.group?.groupslug);

  return !isAllowed ? isRoute ? <NotFound /> : null : children;
};

export default AuthMiddleware;
