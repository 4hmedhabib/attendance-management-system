import { Router } from "express";
import { UserController } from "../controllers";
import {
  CreateUserDto,
  DeleteUserBySlugDto,
  GetFaculiesDto,
  GetUserBySlugDto,
  UpdateUserDto,
} from "../dtos";
import { IRoutes } from "../interfaces/";
import { ValidationMiddleware } from "../middlewares/validation.middleware";

class UserRoute implements IRoutes {
  public path = "/users";
  public router = Router();
  public user = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}`,
      ValidationMiddleware(GetFaculiesDto),
      this.user.getUsers
    );

    this.router.get(
      `${this.path}/detail`,
      ValidationMiddleware(GetUserBySlugDto),
      this.user.getUserBySlug
    );

    this.router.post(
      `${this.path}`,
      ValidationMiddleware(CreateUserDto),
      this.user.createUser
    );

    this.router.put(
      `${this.path}/update`,
      ValidationMiddleware(UpdateUserDto),
      this.user.updateUser
    );

    this.router.delete(
      `${this.path}/delete`,
      ValidationMiddleware(DeleteUserBySlugDto),
      this.user.deleteUser
    );
  }
}

export default UserRoute;
