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
import Classes, { ClassDetail, CreateClass } from "../pages/Classes";
import Courses, { CourseDetail, CreateCourse } from "../pages/Courses";
import Dashboard from "../pages/Dashboard/index";
import Enrollments, {
  CreateEnrollment,
  EnrollmentDetail,
} from "../pages/Enrollments";
import Faculties, { CreateFaculty, FacultyDetail } from "../pages/Faculties";
import Semesters, { CreateSemester, SemesterDetail } from "../pages/Semesters";
import Sessions, { CreateSession, SessionDetail } from "../pages/Sessions";
import Shifts, { CreateShift, ShiftDetail } from "../pages/Shifts";
import Students, { CreateStudent, StudentDetail } from "../pages/Students";
import Teachers, { CreateTeacher, TeacherDetail } from "../pages/Teachers";
import Users, { CreateUser, UserDetail } from "../pages/Users";
import NotFound from "../pages/Utility/NotFound";

const authProtectedRoutes = [
  {
    path: "/dashboard",
    component: <Dashboard />,
    allowedPerms: ["teachers", "deans", "admin"],
  },

  {
    path: "/shifts",
    component: <Shifts />,
    allowedPerms: ["admin"],
  },
  {
    path: "/shifts/create",
    component: <CreateShift />,
    allowedPerms: ["admin"],
  },
  {
    path: "/shifts/detail",
    component: <ShiftDetail />,
    allowedPerms: ["admin"],
  },

  {
    path: "/classes",
    component: <Classes />,
    allowedPerms: ["teachers", "deans", "admin"],
  },
  {
    path: "/classes/create",
    component: <CreateClass />,
    allowedPerms: ["deans", "admin"],
  },
  {
    path: "/classes/detail",
    component: <ClassDetail />,
    allowedPerms: ["teachers", "deans", "admin"],
  },

  {
    path: "/faculties",
    component: <Faculties />,
    allowedPerms: ["deans", "admin"],
  },
  {
    path: "/faculties/create",
    component: <CreateFaculty />,
    allowedPerms: ["deans", "admin"],
  },
  {
    path: "/faculties/detail",
    component: <FacultyDetail />,
    allowedPerms: ["deans", "admin"],
  },

  {
    path: "/semesters",
    component: <Semesters />,
    allowedPerms: ["deans", "admin"],
  },
  {
    path: "/semesters/create",
    component: <CreateSemester />,
    allowedPerms: ["deans", "admin"],
  },
  {
    path: "/semesters/detail",
    component: <SemesterDetail />,
    allowedPerms: ["deans", "admin"],
  },

  {
    path: "/courses",
    component: <Courses />,
    allowedPerms: ["teachers", "deans", "admin"],
  },
  {
    path: "/courses/create",
    component: <CreateCourse />,
    allowedPerms: ["deans", "admin"],
  },
  {
    path: "/courses/detail",
    component: <CourseDetail />,
    allowedPerms: ["teachers", "deans", "admin"],
  },

  {
    path: "/teachers",
    component: <Teachers />,
    allowedPerms: ["deans", "admin"],
  },
  {
    path: "/teachers/create",
    component: <CreateTeacher />,
    allowedPerms: ["deans", "admin"],
  },
  {
    path: "/teachers/detail",
    component: <TeacherDetail />,
    allowedPerms: ["deans", "admin"],
  },

  {
    path: "/students",
    component: <Students />,
    allowedPerms: ["deans", "admin"],
  },
  {
    path: "/students/create",
    component: <CreateStudent />,
    allowedPerms: ["deans", "admin"],
  },
  {
    path: "/students/detail",
    component: <StudentDetail />,
    allowedPerms: ["deans", "admin"],
  },

  {
    path: "/enrollments",
    component: <Enrollments />,
    allowedPerms: ["deans", "admin"],
  },
  {
    path: "/enrollments/create",
    component: <CreateEnrollment />,
    allowedPerms: ["deans", "admin"],
  },
  {
    path: "/enrollments/detail",
    component: <EnrollmentDetail />,
    allowedPerms: ["deans", "admin"],
  },

  {
    path: "/sessions",
    component: <Sessions />,
    allowedPerms: ["teachers", "deans", "admin"],
  },
  {
    path: "/sessions/create",
    component: <CreateSession />,
    allowedPerms: ["teachers", "deans", "admin"],
  },
  {
    path: "/sessions/detail",
    component: <SessionDetail />,
    allowedPerms: ["teachers", "deans", "admin"],
  },

  {
    path: "/administrations",
    component: <Users />,
    allowedPerms: ["deans", "admin"],
  },
  {
    path: "/administrations/create",
    component: <CreateUser />,
    allowedPerms: ["deans", "admin"],
  },
  {
    path: "/administrations/detail",
    component: <UserDetail />,
    allowedPerms: ["deans", "admin"],
  },

  // //profile
  {
    path: "/profile",
    component: <UserProfile />,
    allowedPerms: ["teachers", "deans", "admin"],
  },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  {
    path: "/",
    exact: true,
    component: <Navigate to="/dashboard" />,
    allowedPerms: ["teachers", "deans", "admin"],
  },
  {
    path: "*",
    exact: true,
    component: <NotFound />,
    allowedPerms: ["teachers", "deans", "admin"],
  },
];

const publicRoutes = [
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPwd /> },
  { path: "/register", component: <Register /> },
];

export { authProtectedRoutes, publicRoutes };
