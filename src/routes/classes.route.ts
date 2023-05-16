import { Router } from "express";
import { ClassController } from "../controllers";
import {
  CreateClassDto,
  DeleteClassBySlugDto,
  GetClassBySlugDto,
  GetClassesDto,
  UpdateClassDto,
} from "../dtos";
import { IRoutes } from "../interfaces/";
import { ValidationMiddleware } from "../middlewares/validation.middleware";

class ClassRoute implements IRoutes {
  public path = "/classes";
  public router = Router();
  public class = new ClassController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}`,
      ValidationMiddleware(GetClassesDto),
      this.class.getClasses
    );

    this.router.get(
      `${this.path}/detail`,
      ValidationMiddleware(GetClassBySlugDto),
      this.class.getClassBySlug
    );

    this.router.get(
      `${this.path}/detail/semesters`,
      ValidationMiddleware(GetClassBySlugDto),
      this.class.getClassBySlug
    );

    this.router.post(
      `${this.path}`,
      ValidationMiddleware(CreateClassDto),
      this.class.createClass
    );

    this.router.put(
      `${this.path}/update`,
      ValidationMiddleware(UpdateClassDto),
      this.class.updateClass
    );

    this.router.delete(
      `${this.path}/delete`,
      ValidationMiddleware(DeleteClassBySlugDto),
      this.class.deleteClass
    );
  }
}

export default ClassRoute;
