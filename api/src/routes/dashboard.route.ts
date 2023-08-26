import { Router } from "express";
import { DashboardCtrl } from "../controllers/";
import { DashboardDto } from "../dtos/dashboard.dto";
import { IRoutes } from "../interfaces";
import { ValidationMiddleware } from "../middlewares/validation.middleware";

class DashboardRoute implements IRoutes {
  public path = "/dashboard";
  public router = Router();
  public dashboard = new DashboardCtrl();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/`,
      ValidationMiddleware(DashboardDto),
      this.dashboard.login
    );
  }
}

export default DashboardRoute;
