import React from "react";
import { Navigate } from "react-router-dom";

// Profile
import UserProfile from "../pages/Authentication/user-profile";

// Authentication related pages
import ForgetPwd from "../pages/Authentication/ForgetPassword";
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";

// Dashboard
import Dashboard from "../pages/Dashboard/index";
import Faculties from "../pages/Faculties";
import Shifts from "../pages/Shifts";

const authProtectedRoutes = [
  { path: "/dashboard", component: <Dashboard /> },
  { path: "/shifts", component: <Shifts /> },
  { path: "/classes", component: <Dashboard /> },
  { path: "/faculties", component: <Faculties /> },
  { path: "/courses", component: <Dashboard /> },
  { path: "/teachers", component: <Dashboard /> },
  { path: "/students", component: <Dashboard /> },
  { path: "/enrollments", component: <Dashboard /> },
  { path: "/administrations", component: <Dashboard /> },

  // //profile
  { path: "/profile", component: <UserProfile /> },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  {
    path: "/",
    exact: true,
    component: <Navigate to="/dashboard" />,
  },
];

const publicRoutes = [
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPwd /> },
  { path: "/register", component: <Register /> },
];

export { authProtectedRoutes, publicRoutes };
