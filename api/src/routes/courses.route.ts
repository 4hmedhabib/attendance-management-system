import { Router } from "express";
import { CourseController } from "../controllers";
import {
  CreateCourseDto,
  DeleteCourseBySlugDto,
  GetCourseBySlugDto,
  GetCoursesDto,
  UpdateCourseDto,
} from "../dtos";
import { IRoutes } from "../interfaces";
import { ValidationMiddleware } from "../middlewares/validation.middleware";

class CourseRoute implements IRoutes {
  public path = "/courses";
  public router = Router();
  public course = new CourseController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}`,
      ValidationMiddleware(GetCoursesDto),
      this.course.getCourses
    );

    this.router.get(
      `${this.path}/detail`,
      ValidationMiddleware(GetCourseBySlugDto),
      this.course.getCourseBySlug
    );

    this.router.post(
      `${this.path}`,
      ValidationMiddleware(CreateCourseDto),
      this.course.createCourse
    );

    this.router.put(
      `${this.path}/update`,
      ValidationMiddleware(UpdateCourseDto),
      this.course.updateCourse
    );

    this.router.post(
      `${this.path}/delete`,
      ValidationMiddleware(DeleteCourseBySlugDto),
      this.course.deleteCourse
    );
  }
}

export default CourseRoute;
