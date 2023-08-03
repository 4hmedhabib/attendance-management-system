import { Router } from "express";
import { SemesterController } from "../controllers";
import {
  CreateSemesterDto,
  DeleteSemesterBySlugDto,
  GetSemesterBySlugDto,
  GetSemestersDto,
  UpdateSemesterDto,
} from "../dtos";
import { IRoutes } from "../interfaces";
import { ValidationMiddleware } from "../middlewares/validation.middleware";

class SemesterRoute implements IRoutes {
  public path = "/semesters";
  public router = Router();
  public semester = new SemesterController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/list`,
      ValidationMiddleware(GetSemestersDto),
      this.semester.getSemesters
    );

    this.router.post(
      `${this.path}/detail`,
      ValidationMiddleware(GetSemesterBySlugDto),
      this.semester.getSemesterBySlug
    );

    this.router.post(
      `${this.path}/create`,
      ValidationMiddleware(CreateSemesterDto),
      this.semester.createSemester
    );

    this.router.put(
      `${this.path}/update`,
      ValidationMiddleware(UpdateSemesterDto),
      this.semester.updateSemester
    );

    this.router.post(
      `${this.path}/delete`,
      ValidationMiddleware(DeleteSemesterBySlugDto),
      this.semester.deleteSemester
    );
  }
}

export default SemesterRoute;
