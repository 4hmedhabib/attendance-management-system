import { Router } from "express";
import { IRoutes } from "../interfaces/";
import ClassRoute from "./classes.route";
import CourseRoute from "./courses.route";
import FacultyRoute from "./faculties.route";
import SemisterRoute from "./semisters.route";
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
      new SemisterRoute(),
      new CourseRoute(),
      new StudentRoute(),
      new TeacherRoute(),
    ];

    this.initializeRoutes(routes);
  }

  private initializeRoutes(routes: IRoutes[]) {
    routes.forEach((route) => {
      this.router.use(`${this.path}/`, route.router);
    });
  }
}

export { IndexRoutes };
