import { NextFunction, Request, Response } from "express";
import {
  DeleteFacultyBySlugDto,
  GetFaculiesDto,
  GetFacultyBySlugDto,
  UpdateFacultyDto,
} from "../dtos";
import {
  IFaculty,
  IRBCreateFaculty,
  IRPCreateFacultyPayload,
} from "../interfaces/";
import { FacultyService } from "../services/";

class FacultyController {
  public faculty = new FacultyService();

  public getFaculties = async (
    req: Request<any, any, GetFaculiesDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const isMiniView = req.body.payload.isMiniView;

      const findAllFacultiesData: IFaculty[] =
        await this.faculty.findAllFaculty(isMiniView);

      res.status(200).json({
        data: findAllFacultiesData,
        message: "Faculties Successfully loaded!",
      });
    } catch (error) {
      next(error);
    }
  };

  public getFacultyBySlug = async (
    req: Request<any, any, GetFacultyBySlugDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const facultySlug = req.body.payload.facultySlug;
      const isMiniView = req.body.payload.isMiniView;

      const findOneFacultyData: IFaculty = await this.faculty.findFacultyBySlug(
        facultySlug,
        isMiniView
      );

      res.status(200).json({
        data: findOneFacultyData,
        message: "Faculty successfully loaded",
      });
    } catch (error) {
      next(error);
    }
  };

  public createFaculty = async (
    req: Request<any, any, IRBCreateFaculty>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const facultyData: IRPCreateFacultyPayload = req.body.payload;

      const createFacultyData: IFaculty = await this.faculty.createFaculty(
        facultyData
      );

      res.status(201).json({
        data: createFacultyData,
        message: "Faculty successfully created",
      });
    } catch (error) {
      next(error);
    }
  };

  public updateFaculty = async (
    req: Request<any, any, UpdateFacultyDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const facultySlug = req.body.payload.facultySlug;
      const facultyData = req.body.payload.data;

      const updateFacultyData: IFaculty = await this.faculty.updateFaculty(
        facultySlug,
        facultyData
      );

      res.status(200).json({
        data: updateFacultyData,
        message: "Faculty successfully updated",
      });
    } catch (error) {
      next(error);
    }
  };

  public deleteFaculty = async (
    req: Request<any, any, DeleteFacultyBySlugDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const facultySlug = req.body.payload.facultySlug;

      const deleteFacultyData: IFaculty = await this.faculty.deleteFaculty(
        facultySlug
      );

      res.status(200).json({
        data: deleteFacultyData,
        message: "Faculty successfully deleted",
      });
    } catch (error) {
      next(error);
    }
  };
}

export default FacultyController;
