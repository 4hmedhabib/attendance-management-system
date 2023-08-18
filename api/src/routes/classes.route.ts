import { Router } from "express";
import { ClassController } from "../controllers";
import {
  CreateClassDto,
  CreateClassSemesterCourseAttendancesDto,
  CreateClassSemesterCourseSessionsDto,
  CreateClassSemesterCoursesDto,
  CreateClassSemesterDto,
  DeleteClassBySlugDto,
  GetClassBySlugDto,
  GetClassSemesterCourseAttendancesDto,
  GetClassSemesterCourseSessionsDto,
  GetClassSemesterCoursesBySlugDto,
  GetClassSemestersBySlugDto,
  GetClassesDto,
  UpdateClassDto,
  UpdateClassSemesterCourseAttendancesDto,
  UpdateClassSemesterCourseSessionsDto,
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
    this.router.post(
      `${this.path}/list`,
      ValidationMiddleware(GetClassesDto),
      this.class.getClasses
    );

    this.router.post(
      `${this.path}/detail`,
      ValidationMiddleware(GetClassBySlugDto),
      this.class.getClassBySlug
    );

    this.router.post(
      `${this.path}/create`,
      ValidationMiddleware(CreateClassDto),
      this.class.createClass
    );

    this.router.put(
      `${this.path}/update`,
      ValidationMiddleware(UpdateClassDto),
      this.class.updateClass
    );

    this.router.post(
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

    this.router.post(
      `${this.path}/detail/semesters/courses/attendances/create`,
      ValidationMiddleware(CreateClassSemesterCourseAttendancesDto),
      this.class.createClassSemesterCourseAttendances
    );

    this.router.get(
      `${this.path}/detail/semesters/courses/attendances/`,
      ValidationMiddleware(GetClassSemesterCourseAttendancesDto),
      this.class.getClassSemesterCourseAttendances
    );

    this.router.put(
      `${this.path}/detail/semesters/courses/attendances/update`,
      ValidationMiddleware(UpdateClassSemesterCourseAttendancesDto),
      this.class.updateClassSemesterCourseAttendances
    );

    this.router.post(
      `${this.path}/detail/semesters/courses/sessions/create`,
      ValidationMiddleware(CreateClassSemesterCourseSessionsDto),
      this.class.createClassSemesterCourseSessions
    );

    this.router.get(
      `${this.path}/detail/semesters/courses/sessions/`,
      ValidationMiddleware(GetClassSemesterCourseSessionsDto),
      this.class.getClassSemesterCourseSessions
    );

    this.router.put(
      `${this.path}/detail/semesters/courses/sessions/update`,
      ValidationMiddleware(UpdateClassSemesterCourseSessionsDto),
      this.class.updateClassSemesterCourseSessions
    );
  }
}

export default ClassRoute;
