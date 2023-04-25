import { NextFunction, Request, Response } from "express";
import { GetFacultyBySlugDto } from "../dtos/faculties.dto";
import {
  IFaculty,
  IRBCreateFaculty,
  IRPCreateFacultyPayload,
} from "../interfaces/";
import { FacultyService } from "../services/";

class FacultyController {
  public faculty = new FacultyService();

  public getFaculties = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const findAllFacultiesData: IFaculty[] =
        await this.faculty.findAllFaculty();

      res.status(200).json({
        data: findAllFacultiesData,
        message: "Successfully facalites loaded!",
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

      res
        .status(200)
        .json({
          data: findOneFacultyData,
          message: "Successfully faculty loaded",
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
        message: "Successfully faculty created",
      });
    } catch (error) {
      next(error);
    }
  };

  public updateFaculty = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const facultyId = Number(req.params.id);
      const facultyData: IFaculty = req.body;
      const updateFacultyData: IFaculty[] = await this.faculty.updateFaculty(
        facultyId,
        facultyData
      );

      res.status(200).json({ data: updateFacultyData, message: "updated" });
    } catch (error) {
      next(error);
    }
  };

  public deleteFaculty = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const facultyId = Number(req.params.id);
      const deleteFacultyData: IFaculty[] = await this.faculty.deleteFaculty(
        facultyId
      );

      res.status(200).json({ data: deleteFacultyData, message: "deleted" });
    } catch (error) {
      next(error);
    }
  };
}

export default FacultyController;
