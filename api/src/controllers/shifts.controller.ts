import { NextFunction, Request, Response } from "express";
import {
  DeleteShiftBySlugDto,
  GetShiftBySlugDto,
  UpdateShiftDto,
} from "../dtos/shifts.dto";
import { IRBCreateShift, IRPCreateShiftPayload, IShift } from "../interfaces";
import { ShiftService } from "../services";
import { GetShiftsDto } from "./../dtos/shifts.dto";

class ShiftController {
  public shift = new ShiftService();

  public getShifts = async (
    req: Request<any, any, GetShiftsDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const isMiniView = req.body.payload.isMiniView;

      const findAllFacultiesData: IShift[] = await this.shift.findAllShift(
        isMiniView
      );

      res.status(200).json({
        data: findAllFacultiesData,
        message: "Faculties Successfully loaded!",
      });
    } catch (error) {
      next(error);
    }
  };

  public getShiftBySlug = async (
    req: Request<any, any, GetShiftBySlugDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const shiftSlug = req.body.payload.shiftSlug;
      const isMiniView = req.body.payload.isMiniView;

      const findOneShiftData: IShift = await this.shift.findShiftBySlug(
        shiftSlug,
        isMiniView
      );

      res.status(200).json({
        data: findOneShiftData,
        message: "Shift successfully loaded",
      });
    } catch (error) {
      next(error);
    }
  };

  public createShift = async (
    req: Request<any, any, IRBCreateShift>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const shiftData: IRPCreateShiftPayload = req.body.payload;

      const createShiftData: IShift = await this.shift.createShift(shiftData);

      res.status(201).json({
        data: createShiftData,
        message: "Shift successfully created",
      });
    } catch (error) {
      next(error);
    }
  };

  public updateShift = async (
    req: Request<any, any, UpdateShiftDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const shiftSlug = req.body.payload.shiftSlug;
      const shiftData = req.body.payload.data;

      const updateShiftData: IShift = await this.shift.updateShift(
        shiftSlug,
        shiftData
      );

      res.status(200).json({
        data: updateShiftData,
        message: "Shift successfully updated",
      });
    } catch (error) {
      next(error);
    }
  };

  public deleteShift = async (
    req: Request<any, any, DeleteShiftBySlugDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const shiftSlug = req.body.payload.shiftSlug;

      const deleteShiftData: IShift = await this.shift.deleteShift(shiftSlug);

      res.status(200).json({
        data: deleteShiftData,
        message: "Shift successfully deleted",
      });
    } catch (error) {
      next(error);
    }
  };
}

export default ShiftController;
