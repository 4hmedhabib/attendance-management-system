import { Router } from "express";
import { FacultyController } from "../controllers";
import {
  CreateFacultyDto,
  DeleteFacultyBySlugDto,
  GetFacultyBySlugDto,
  UpdateFacultyDto,
} from "../dtos/faculties.dto";
import { IRoutes } from "../interfaces/";
import { ValidationMiddleware } from "../middlewares/validation.middleware";

class FacultyRoute implements IRoutes {
  public path = "/faculties";
  public router = Router();
  public faculty = new FacultyController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.faculty.getFaculties);

    this.router.get(
      `${this.path}/detail`,
      ValidationMiddleware(GetFacultyBySlugDto),
      this.faculty.getFacultyBySlug
    );

    this.router.post(
      `${this.path}`,
      ValidationMiddleware(CreateFacultyDto),
      this.faculty.createFaculty
    );

    this.router.put(
      `${this.path}/update`,
      ValidationMiddleware(UpdateFacultyDto),
      this.faculty.updateFaculty
    );

    this.router.delete(
      `${this.path}/delete`,
      ValidationMiddleware(DeleteFacultyBySlugDto),
      this.faculty.deleteFaculty
    );
  }
}

export default FacultyRoute;
