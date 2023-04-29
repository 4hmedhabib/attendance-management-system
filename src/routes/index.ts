import { Router } from "express";
import { IRoutes } from "../interfaces/";
import ClassRoute from "./classes.route";
import FacultyRoute from "./faculties.route";
import ShiftRoute from "./shifts.route";
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
