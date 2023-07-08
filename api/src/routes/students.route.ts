import { Router } from "express";
import { StudentController } from "../controllers";
import {
  CreateBulkStudentDto,
  CreateEnrollmentDto,
  CreateStudentDto,
  DeleteStudentBySlugDto,
  EnrollmentDetailDto,
  EnrollmentsDto,
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

    // create student in specific class
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

    this.router.post(
      `${this.path}/enrollments/create`,
      ValidationMiddleware(CreateEnrollmentDto),
      this.student.createEnrollment
    );

    this.router.get(
      `${this.path}/enrollments/detail`,
      ValidationMiddleware(EnrollmentDetailDto),
      this.student.createEnrollment
    );

    this.router.get(
      `${this.path}/enrollments/`,
      ValidationMiddleware(EnrollmentsDto),
      this.student.getEnrollments
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
