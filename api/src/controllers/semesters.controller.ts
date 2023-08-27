import { NextFunction, Request, Response } from "express";
import {
  DeleteSemesterBySlugDto,
  GetSemesterBySlugDto,
  GetSemestersDto,
  UpdateSemesterDto,
} from "../dtos";
import {
  IRBCreateSemester,
  IRPCreateSemesterPayload,
  ISemester,
} from "../interfaces";
import { SemesterService } from "../services";

class SemesterController {
  public semester = new SemesterService();

  public getSemesters = async (
    req: Request<any, any, GetSemestersDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const isMiniView = req.body.payload.isMiniView;

      const findAllSemestersData: ISemester[] =
        await this.semester.findAllSemester(isMiniView);

      res.status(200).json({
        data: findAllSemestersData,
        message: "Semesters Successfully loaded!",
      });
    } catch (error) {
      next(error);
    }
  };

  public getSemesterBySlug = async (
    req: Request<any, any, GetSemesterBySlugDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const semesterSlug = req.body.payload.semesterSlug;
      const isMiniView = req.body.payload.isMiniView;

      const findOneSemesterData: ISemester =
        await this.semester.findSemesterBySlug(semesterSlug, isMiniView);

      res.status(200).json({
        data: findOneSemesterData,
        message: "Semester successfully loaded",
      });
    } catch (error) {
      next(error);
    }
  };

  public createSemester = async (
    req: Request<any, any, IRBCreateSemester>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const semesterData: IRPCreateSemesterPayload = req.body.payload;

      const createSemesterData: ISemester = await this.semester.createSemester(
        req,
        semesterData
      );

      res.status(201).json({
        data: createSemesterData,
        message: "Semester successfully created",
      });
    } catch (error) {
      next(error);
    }
  };

  public updateSemester = async (
    req: Request<any, any, UpdateSemesterDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const semesterSlug = req.body.payload.semesterSlug;
      const semesterData = req.body.payload.data;

      const updateSemesterData: ISemester = await this.semester.updateSemester(
        semesterSlug,
        semesterData
      );

      res.status(200).json({
        data: updateSemesterData,
        message: "Semester successfully updated",
      });
    } catch (error) {
      next(error);
    }
  };

  public deleteSemester = async (
    req: Request<any, any, DeleteSemesterBySlugDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const semesterSlug = req.body.payload.semesterSlug;

      const deleteSemesterData: ISemester = await this.semester.deleteSemester(
        semesterSlug
      );

      res.status(200).json({
        data: deleteSemesterData,
        message: "Semester successfully deleted",
      });
    } catch (error) {
      next(error);
    }
  };
}

export default SemesterController;
