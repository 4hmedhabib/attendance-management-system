import { Router } from "express";
import { SemisterController } from "../controllers";
import {
  CreateSemisterDto,
  DeleteSemisterBySlugDto,
  GetSemisterBySlugDto,
  GetSemistersDto,
  UpdateSemisterDto,
} from "../dtos";
import { IRoutes } from "../interfaces";
import { ValidationMiddleware } from "../middlewares/validation.middleware";

class SemisterRoute implements IRoutes {
  public path = "/semisters";
  public router = Router();
  public semister = new SemisterController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}`,
      ValidationMiddleware(GetSemistersDto),
      this.semister.getSemisters
    );

    this.router.get(
      `${this.path}/detail`,
      ValidationMiddleware(GetSemisterBySlugDto),
      this.semister.getSemisterBySlug
    );

    this.router.post(
      `${this.path}`,
      ValidationMiddleware(CreateSemisterDto),
      this.semister.createSemister
    );

    this.router.put(
      `${this.path}/update`,
      ValidationMiddleware(UpdateSemisterDto),
      this.semister.updateSemister
    );

    this.router.delete(
      `${this.path}/delete`,
      ValidationMiddleware(DeleteSemisterBySlugDto),
      this.semister.deleteSemister
    );
  }
}

export default SemisterRoute;
