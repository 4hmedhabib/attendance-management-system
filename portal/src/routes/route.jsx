import React from "react";
import { Navigate } from "react-router-dom";

const AuthMiddleware = (props) => {
  if (!localStorage.getItem("authUser")) {
    return (
      <Navigate to={{ pathname: "/login", state: { from: props.location } }} />
    );
  }

  return <React.Fragment>{props.children}</React.Fragment>;
};

export default AuthMiddleware;
