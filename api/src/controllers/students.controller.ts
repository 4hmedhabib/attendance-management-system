import { NextFunction, Request, Response } from "express";
import {
  DeleteStudentBySlugDto,
  GetFacultiesDto,
  GetStudentBySlugDto,
  UpdateStudentDto,
} from "../dtos";
import {
  IEnrollment,
  IRBCreateStudent,
  IRPCreateStudentPayload,
  IStudent,
} from "../interfaces";
import { StudentService } from "../services";
import {
  BulkStudentDataPayload,
  CreateBulkStudentDto,
  CreateEnrollmentDto,
  CreateEnrollmentPayload,
  EnrollmentDetailDto,
  EnrollmentsDto,
} from "./../dtos/students.dto";

class StudentController {
  public student = new StudentService();

  public getStudents = async (
    req: Request<any, any, GetFacultiesDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const isMiniView = req.body.payload.isMiniView;

      const findAllStudentsData: IStudent[] = await this.student.findAllStudent(
        isMiniView
      );

      res.status(200).json({
        data: findAllStudentsData,
        message: "Students Successfully loaded!",
      });
    } catch (error) {
      next(error);
    }
  };

  public getStudentBySlug = async (
    req: Request<any, any, GetStudentBySlugDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const studentId = req.body.payload.studentId;
      const isMiniView = req.body.payload.isMiniView;

      const findOneStudentData: IStudent = await this.student.findStudentBySlug(
        studentId,
        isMiniView
      );

      res.status(200).json({
        data: findOneStudentData,
        message: "Student successfully loaded",
      });
    } catch (error) {
      next(error);
    }
  };

  public createStudent = async (
    req: Request<any, any, IRBCreateStudent>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const studentData: IRPCreateStudentPayload = req.body.payload;

      const createStudentData: IStudent = await this.student.createStudent(
        studentData
      );

      res.status(201).json({
        data: createStudentData,
        message: "Student successfully created",
      });
    } catch (error) {
      next(error);
    }
  };

  public createBulkStudents = async (
    req: Request<any, any, CreateBulkStudentDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const studentsData: BulkStudentDataPayload = req.body.payload;

      if (studentsData.data.length > 100) {
        res.status(413).json({
          message:
            "Student data is too large, please the maximum students is 100",
        });
        return;
      }

      const createStudentData: IStudent = await this.student.createBulkStudents(
        studentsData
      );

      res.status(201).json({
        data: createStudentData,
        message: "Student successfully created",
      });
    } catch (error) {
      next(error);
    }
  };

  public updateStudent = async (
    req: Request<any, any, UpdateStudentDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const studentId = req.body.payload.studentId;
      const studentData = req.body.payload.data;

      const updateStudentData: IStudent = await this.student.updateStudent(
        studentId,
        studentData
      );

      res.status(200).json({
        data: updateStudentData,
        message: "Student successfully updated",
      });
    } catch (error) {
      next(error);
    }
  };

  public deleteStudent = async (
    req: Request<any, any, DeleteStudentBySlugDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const studentId = req.body.payload.studentId;

      const deleteStudentData: IStudent = await this.student.deleteStudent(
        studentId
      );

      res.status(200).json({
        data: deleteStudentData,
        message: "Student successfully deleted",
      });
    } catch (error) {
      next(error);
    }
  };

  public createEnrollment = async (
    req: Request<any, any, CreateEnrollmentDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const enrollmentData: CreateEnrollmentPayload[] = req.body.payload.data;

      const createEnrollmentData: IEnrollment =
        await this.student.createEnrollment(enrollmentData);

      res.status(201).json({
        data: createEnrollmentData,
        message: "Enrollment successfully created",
      });
    } catch (error) {
      next(error);
    }
  };

  public getEnrollments = async (
    req: Request<any, any, EnrollmentsDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const isMiniView = req.body.payload.isMiniView;
      const filters = req.body.payload.filters;

      const findAllEnrollmentsData: IEnrollment[] =
        await this.student.findAllEnrollments(isMiniView, filters);

      res.status(200).json({
        data: findAllEnrollmentsData,
        message: "Enrollments Successfully loaded!",
      });
    } catch (error) {
      next(error);
    }
  };

  public getEnrollment = async (
    req: Request<any, any, EnrollmentDetailDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const isMiniView = req.body.payload.isMiniView;
      const enrollmentId = req.body.payload.enrollmentId;

      const findAllEnrollmentData: IEnrollment =
        await this.student.findAllEnrollment(isMiniView, enrollmentId);

      res.status(200).json({
        data: findAllEnrollmentData,
        message: "Enrollment Successfully loaded!",
      });
    } catch (error) {
      next(error);
    }
  };
}

export default StudentController;
