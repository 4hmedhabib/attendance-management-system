import { NextFunction, Request, Response } from "express";
import {
  DeleteSemisterBySlugDto,
  GetSemisterBySlugDto,
  GetSemistersDto,
  UpdateSemisterDto,
} from "../dtos";
import {
  IRBCreateSemister,
  IRPCreateSemisterPayload,
  ISemister,
} from "../interfaces";
import { SemisterService } from "../services";

class SemisterController {
  public semister = new SemisterService();

  public getSemisters = async (
    req: Request<any, any, GetSemistersDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const isMiniView = req.body.payload.isMiniView;

      const findAllSemistersData: ISemister[] =
        await this.semister.findAllSemister(isMiniView);

      res.status(200).json({
        data: findAllSemistersData,
        message: "Semisters Successfully loaded!",
      });
    } catch (error) {
      next(error);
    }
  };

  public getSemisterBySlug = async (
    req: Request<any, any, GetSemisterBySlugDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const semisterSlug = req.body.payload.semisterSlug;
      const isMiniView = req.body.payload.isMiniView;

      const findOneSemisterData: ISemister =
        await this.semister.findSemisterBySlug(semisterSlug, isMiniView);

      res.status(200).json({
        data: findOneSemisterData,
        message: "Semister successfully loaded",
      });
    } catch (error) {
      next(error);
    }
  };

  public createSemister = async (
    req: Request<any, any, IRBCreateSemister>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const semisterData: IRPCreateSemisterPayload = req.body.payload;

      const createSemisterData: ISemister = await this.semister.createSemister(
        semisterData
      );

      res.status(201).json({
        data: createSemisterData,
        message: "Semister successfully created",
      });
    } catch (error) {
      next(error);
    }
  };

  public updateSemister = async (
    req: Request<any, any, UpdateSemisterDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const semisterSlug = req.body.payload.semisterSlug;
      const semisterData = req.body.payload.data;

      const updateSemisterData: ISemister = await this.semister.updateSemister(
        semisterSlug,
        semisterData
      );

      res.status(200).json({
        data: updateSemisterData,
        message: "Semister successfully updated",
      });
    } catch (error) {
      next(error);
    }
  };

  public deleteSemister = async (
    req: Request<any, any, DeleteSemisterBySlugDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const semisterSlug = req.body.payload.semisterSlug;

      const deleteSemisterData: ISemister = await this.semister.deleteSemister(
        semisterSlug
      );

      res.status(200).json({
        data: deleteSemisterData,
        message: "Semister successfully deleted",
      });
    } catch (error) {
      next(error);
    }
  };
}

export default SemisterController;
