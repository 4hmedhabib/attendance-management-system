import { Router } from "express";
import { IRoutes } from "../interfaces/";
import FacultyRoute from "./faculties.route";
import ShiftRoute from "./shifts.route";

class IndexRoutes implements IRoutes {
  public path = "/api";
  public router = Router();

  constructor() {
    const routes: IRoutes[] = [new FacultyRoute(), new ShiftRoute()];

    this.initializeRoutes(routes);
  }

  private initializeRoutes(routes: IRoutes[]) {
    routes.forEach((route) => {
      this.router.use(`${this.path}/`, route.router);
    });
  }
}

export { IndexRoutes };
