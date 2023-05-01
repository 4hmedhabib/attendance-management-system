import { NextFunction, Request, Response } from "express";
import {
  DeleteStudentBySlugDto,
  GetFacultiesDto,
  GetStudentBySlugDto,
  UpdateStudentDto,
} from "../dtos";
import {
  IRBCreateStudent,
  IRPCreateStudentPayload,
  IStudent,
} from "../interfaces";
import { StudentService } from "../services";

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
}

export default StudentController;