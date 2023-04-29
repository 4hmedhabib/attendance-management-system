import { NextFunction, Request, Response } from "express";
import {
  DeleteClassBySlugDto,
  GetClassBySlugDto,
  GetClassesDto,
  UpdateClassDto,
} from "../dtos";
import { IClass, IRBCreateClass, IRPCreateClassPayload } from "../interfaces/";
import { ClassService } from "../services/";

class ClassController {
  public class = new ClassService();

  public getClasses = async (
    req: Request<any, any, GetClassesDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const isMiniView = req.body.payload.isMiniView;

      const findAllClassesData: IClass[] = await this.class.findAllClass(
        isMiniView
      );

      res.status(200).json({
        data: findAllClassesData,
        message: "Classes Successfully loaded!",
      });
    } catch (error) {
      next(error);
    }
  };

  public getClassBySlug = async (
    req: Request<any, any, GetClassBySlugDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const classSlug = req.body.payload.classSlug;
      const isMiniView = req.body.payload.isMiniView;

      const findOneClassData: IClass = await this.class.findClassBySlug(
        classSlug,
        isMiniView
      );

      res.status(200).json({
        data: findOneClassData,
        message: "Class successfully loaded",
      });
    } catch (error) {
      next(error);
    }
  };

  public createClass = async (
    req: Request<any, any, IRBCreateClass>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const classData: IRPCreateClassPayload = req.body.payload;

      const createClassData: IClass = await this.class.createClass(classData);

      res.status(201).json({
        data: createClassData,
        message: "Class successfully created",
      });
    } catch (error) {
      next(error);
    }
  };

  public updateClass = async (
    req: Request<any, any, UpdateClassDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const classSlug = req.body.payload.classSlug;
      const classData = req.body.payload.data;

      const updateClassData: IClass = await this.class.updateClass(
        classSlug,
        classData
      );

      res.status(200).json({
        data: updateClassData,
        message: "Class successfully updated",
      });
    } catch (error) {
      next(error);
    }
  };

  public deleteClass = async (
    req: Request<any, any, DeleteClassBySlugDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const classSlug = req.body.payload.classSlug;

      const deleteClassData: IClass = await this.class.deleteClass(classSlug);

      res.status(200).json({
        data: deleteClassData,
        message: "Class successfully deleted",
      });
    } catch (error) {
      next(error);
    }
  };
}

export default ClassController;
