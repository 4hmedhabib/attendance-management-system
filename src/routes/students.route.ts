import { Router } from "express";
import { StudentController } from "../controllers";
import {
  CreateBulkStudentDto,
  CreateStudentDto,
  DeleteStudentBySlugDto,
  GetFacultiesDto,
  GetStudentBySlugDto,
  UpdateStudentDto,
} from "../dtos";
import { IRoutes } from "../interfaces";
import { ValidationMiddleware } from "../middlewares/validation.middleware";

class StudentRoute implements IRoutes {
  public path = "/students";
  public router = Router();
  public student = new StudentController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}`,
      ValidationMiddleware(GetFacultiesDto),
      this.student.getStudents
    );

    this.router.get(
      `${this.path}/detail`,
      ValidationMiddleware(GetStudentBySlugDto),
      this.student.getStudentBySlug
    );

    this.router.post(
      `${this.path}`,
      ValidationMiddleware(CreateStudentDto),
      this.student.createStudent
    );

    this.router.post(
      `${this.path}/bulk-create`,
      ValidationMiddleware(CreateBulkStudentDto),
      this.student.createBulkStudents
    );

    this.router.put(
      `${this.path}/update`,
      ValidationMiddleware(UpdateStudentDto),
      this.student.updateStudent
    );

    this.router.delete(
      `${this.path}/delete`,
      ValidationMiddleware(DeleteStudentBySlugDto),
      this.student.deleteStudent
    );
  }
}

export default StudentRoute;
