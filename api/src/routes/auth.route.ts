import { Router } from "express";
import { CourseController } from "../controllers";
import {
  CreateCourseDto,
  DeleteCourseBySlugDto,
  GetCourseBySlugDto,
  GetCoursesDto,
  LoginDto,
  UpdateCourseDto,
} from "../dtos";
import { IRoutes } from "../interfaces";
import { ValidationMiddleware } from "../middlewares/validation.middleware";
import AuthController from "../controllers/auth.controller";

class AuthRoute implements IRoutes {
  public path = "/auth";
  public router = Router();
  public auth = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/login`,
      ValidationMiddleware(LoginDto),
      this.auth.login
    );
  }
}

export default AuthRoute;
