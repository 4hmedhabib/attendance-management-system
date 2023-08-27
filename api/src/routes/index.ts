import { Router } from "express";
import { IRoutes } from "../interfaces/";
import { isSessionValid } from "../middlewares/validation.middleware";
import AuthRoute from "./auth.route";
import ClassRoute from "./classes.route";
import CourseRoute from "./courses.route";
import DashboardRoute from "./dashboard.route";
import FacultyRoute from "./faculties.route";
import SemesterRoute from "./semesters.route";
import ShiftRoute from "./shifts.route";
import StudentRoute from "./students.route";
import TeacherRoute from "./teachers.route";
import UserRoute from "./users.route";

class IndexRoutes implements IRoutes {
  public path = "/api";
  public router = Router();

  constructor() {
    const routes: IRoutes[] = [
      new UserRoute(),
      new FacultyRoute(),
      new ShiftRoute(),
      new ClassRoute(),
      new SemesterRoute(),
      new CourseRoute(),
      new StudentRoute(),
      new TeacherRoute(),
      new DashboardRoute(),
    ];

    this.initializeRoutes(routes, [new AuthRoute()]);
  }

  private initializeRoutes(routes: IRoutes[], authRoutes: IRoutes[]) {
    routes.forEach((route) => {
      this.router.use(`${this.path}/`, isSessionValid, route.router);
    });

    authRoutes.forEach((route) => {
      this.router.use(`/`, route.router);
    });
  }
}

export { IndexRoutes };
