import { NextFunction, Request, Response } from "express";
import {
  DeleteTeacherBySlugDto,
  GetFacultiesDto,
  GetTeacherBySlugDto,
  UpdateTeacherDto,
} from "../dtos";
import {
  IRBCreateTeacher,
  IRPCreateTeacherPayload,
  ITeacher,
} from "../interfaces";
import { TeacherService } from "../services";

class TeacherController {
  public student = new TeacherService();

  public getTeachers = async (
    req: Request<any, any, GetFacultiesDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const isMiniView = req.body.payload.isMiniView;

      const findAllTeachersData: ITeacher[] = await this.student.findAllTeacher(
        isMiniView
      );

      res.status(200).json({
        data: findAllTeachersData,
        message: "Teachers Successfully loaded!",
      });
    } catch (error) {
      next(error);
    }
  };

  public getTeacherBySlug = async (
    req: Request<any, any, GetTeacherBySlugDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const teacherId = req.body.payload.teacherId;
      const isMiniView = req.body.payload.isMiniView;

      const findOneTeacherData: ITeacher = await this.student.findTeacherBySlug(
        teacherId,
        isMiniView
      );

      res.status(200).json({
        data: findOneTeacherData,
        message: "Teacher successfully loaded",
      });
    } catch (error) {
      next(error);
    }
  };

  public createTeacher = async (
    req: Request<any, any, IRBCreateTeacher>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const studentData: IRPCreateTeacherPayload = req.body.payload;

      const createTeacherData: ITeacher = await this.student.createTeacher(
        studentData
      );

      res.status(201).json({
        data: createTeacherData,
        message: "Teacher successfully created",
      });
    } catch (error) {
      next(error);
    }
  };

  public updateTeacher = async (
    req: Request<any, any, UpdateTeacherDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const teacherId = req.body.payload.teacherId;
      const studentData = req.body.payload.data;

      const updateTeacherData: ITeacher = await this.student.updateTeacher(
        teacherId,
        studentData
      );

      res.status(200).json({
        data: updateTeacherData,
        message: "Teacher successfully updated",
      });
    } catch (error) {
      next(error);
    }
  };

  public deleteTeacher = async (
    req: Request<any, any, DeleteTeacherBySlugDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const teacherId = req.body.payload.teacherId;

      const deleteTeacherData: ITeacher = await this.student.deleteTeacher(
        teacherId
      );

      res.status(200).json({
        data: deleteTeacherData,
        message: "Teacher successfully deleted",
      });
    } catch (error) {
      next(error);
    }
  };
}

export default TeacherController;
