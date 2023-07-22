import { Router } from "express";
import { TeacherController } from "../controllers";
import {
  CreateTeacherDto,
  DeleteTeacherBySlugDto,
  GetFacultiesDto,
  GetTeacherBySlugDto,
  UpdateTeacherDto,
} from "../dtos";
import { IRoutes } from "../interfaces";
import { ValidationMiddleware } from "../middlewares/validation.middleware";

class TeacherRoute implements IRoutes {
  public path = "/teachers";
  public router = Router();
  public teacher = new TeacherController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}`,
      ValidationMiddleware(GetFacultiesDto),
      this.teacher.getTeachers
    );

    this.router.get(
      `${this.path}/detail`,
      ValidationMiddleware(GetTeacherBySlugDto),
      this.teacher.getTeacherBySlug
    );

    this.router.post(
      `${this.path}`,
      ValidationMiddleware(CreateTeacherDto),
      this.teacher.createTeacher
    );

    this.router.put(
      `${this.path}/update`,
      ValidationMiddleware(UpdateTeacherDto),
      this.teacher.updateTeacher
    );

    this.router.post(
      `${this.path}/delete`,
      ValidationMiddleware(DeleteTeacherBySlugDto),
      this.teacher.deleteTeacher
    );
  }
}

export default TeacherRoute;
