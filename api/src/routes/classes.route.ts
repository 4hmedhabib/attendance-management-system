import { Router } from "express";
import { ClassController } from "../controllers";
import {
  CreateClassDto,
  CreateClassSemesterCoursesDto,
  CreateClassSemesterDto,
  DeleteClassBySlugDto,
  GetClassBySlugDto,
  GetClassSemesterCoursesBySlugDto,
  GetClassSemestersBySlugDto,
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

    this.router.get(
      `${this.path}/detail/semesters`,
      ValidationMiddleware(GetClassSemestersBySlugDto),
      this.class.getClassSemestersBySlug
    );

    this.router.post(
      `${this.path}/detail/semesters/create`,
      ValidationMiddleware(CreateClassSemesterDto),
      this.class.createClassSemester
    );

    this.router.get(
      `${this.path}/detail/semesters/courses`,
      ValidationMiddleware(GetClassSemesterCoursesBySlugDto),
      this.class.getClassSemesterCoursesBySlug
    );

    this.router.post(
      `${this.path}/detail/semesters/courses/create`,
      ValidationMiddleware(CreateClassSemesterCoursesDto),
      this.class.createClassSemesterCourses
    );
  }
}

export default ClassRoute;
