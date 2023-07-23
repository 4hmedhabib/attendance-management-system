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
import Faculties, { CreateFaculty, FacultyDetail } from "../pages/Faculties";
import Shifts, { CreateShift, ShiftDetail } from "../pages/Shifts";
import Classes, { ClassDetail, CreateClass } from "../pages/Classes";
import Courses, { CourseDetail, CreateCourse } from "../pages/Courses";
import Teachers, { TeacherDetail, CreateTeacher } from "../pages/Teachers";

const authProtectedRoutes = [
  { path: "/dashboard", component: <Dashboard /> },

  { path: "/shifts", component: <Shifts /> },
  { path: "/shifts/create", component: <CreateShift /> },
  { path: "/shifts/detail", component: <ShiftDetail /> },

  { path: "/classes", component: <Classes /> },
  { path: "/classes/create", component: <CreateClass /> },
  { path: "/classes/detail", component: <ClassDetail /> },

  { path: "/faculties", component: <Faculties /> },
  { path: "/faculties/create", component: <CreateFaculty /> },
  { path: "/faculties/detail", component: <FacultyDetail /> },

  { path: "/courses", component: <Courses /> },
  { path: "/courses/create", component: <CreateCourse /> },
  { path: "/courses/detail", component: <CourseDetail /> },

  { path: "/teachers", component: <Teachers /> },
  { path: "/teachers/create", component: <CreateTeacher /> },
  { path: "/teachers/detail", component: <TeacherDetail /> },

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
