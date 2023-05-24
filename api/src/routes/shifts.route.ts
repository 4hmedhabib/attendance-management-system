import { Router } from "express";
import { ShiftController } from "../controllers";
import {
  CreateShiftDto,
  DeleteShiftBySlugDto,
  GetShiftBySlugDto,
  GetShiftsDto,
  UpdateShiftDto,
} from "../dtos/shifts.dto";
import { IRoutes } from "../interfaces/";
import { ValidationMiddleware } from "../middlewares/validation.middleware";

class ShiftRoute implements IRoutes {
  public path = "/shifts";
  public router = Router();
  public faculty = new ShiftController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}`,
      ValidationMiddleware(GetShiftsDto),
      this.faculty.getShifts
    );

    this.router.get(
      `${this.path}/detail`,
      ValidationMiddleware(GetShiftBySlugDto),
      this.faculty.getShiftBySlug
    );

    this.router.post(
      `${this.path}`,
      ValidationMiddleware(CreateShiftDto),
      this.faculty.createShift
    );

    this.router.put(
      `${this.path}/update`,
      ValidationMiddleware(UpdateShiftDto),
      this.faculty.updateShift
    );

    this.router.delete(
      `${this.path}/delete`,
      ValidationMiddleware(DeleteShiftBySlugDto),
      this.faculty.deleteShift
    );
  }
}

export default ShiftRoute;
