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
    this.router.post(
      `${this.path}/list`,
      ValidationMiddleware(GetShiftsDto),
      this.faculty.getShifts
    );

    this.router.post(
      `${this.path}/detail`,
      ValidationMiddleware(GetShiftBySlugDto),
      this.faculty.getShiftBySlug
    );

    this.router.post(
      `${this.path}/create`,
      ValidationMiddleware(CreateShiftDto),
      this.faculty.createShift
    );

    this.router.put(
      `${this.path}/update`,
      ValidationMiddleware(UpdateShiftDto),
      this.faculty.updateShift
    );

    this.router.post(
      `${this.path}/delete`,
      ValidationMiddleware(DeleteShiftBySlugDto),
      this.faculty.deleteShift
    );
  }
}

export default ShiftRoute;
