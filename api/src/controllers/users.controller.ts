import { NextFunction, Request, Response } from "express";
import {
  DeleteUserBySlugDto,
  GetGroupsDto,
  GetUserBySlugDto,
  GetUsersDto,
  UpdateUserDto,
} from "../dtos";
import {
  IGroup,
  IRBCreateUser,
  IRPCreateUserPayload,
  IUser,
} from "../interfaces/";
import { UserService } from "../services/";

class UserController {
  public user = new UserService();

  public getUsers = async (
    req: Request<any, any, GetUsersDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const isMiniView = req.body.payload.isMiniView;
      const filters = req.body.payload.filters;

      const findAllUsersData: IUser[] = await this.user.findAllUser(
        isMiniView,
        filters
      );

      res.status(200).json({
        data: findAllUsersData,
        message: "Users Successfully loaded!",
      });
    } catch (error) {
      next(error);
    }
  };

  public getUserBySlug = async (
    req: Request<any, any, GetUserBySlugDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const username = req.body.payload.username;
      const isMiniView = req.body.payload.isMiniView;

      const findOneUserData: IUser = await this.user.findUserBySlug(
        username,
        isMiniView
      );

      res.status(200).json({
        data: findOneUserData,
        message: "User successfully loaded",
      });
    } catch (error) {
      next(error);
    }
  };

  public createUser = async (
    req: Request<any, any, IRBCreateUser>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userData: IRPCreateUserPayload = req.body.payload;

      const createUserData: IUser = await this.user.createUser(userData);

      res.status(201).json({
        data: createUserData,
        message: "User successfully created",
      });
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (
    req: Request<any, any, UpdateUserDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const username = req.body.payload.username;
      const userData = req.body.payload.data;

      const updateUserData: IUser = await this.user.updateUser(
        username,
        userData
      );

      res.status(200).json({
        data: updateUserData,
        message: "User successfully updated",
      });
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (
    req: Request<any, any, DeleteUserBySlugDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const username = req.body.payload.username;

      const deleteUserData: IUser = await this.user.deleteUser(username);

      res.status(200).json({
        data: deleteUserData,
        message: "User successfully deleted",
      });
    } catch (error) {
      next(error);
    }
  };

  public findAllGroups = async (
    req: Request<any, any, GetGroupsDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const isMiniView = req.body.payload.isMiniView;

      const findAllGroupsData: IGroup[] = await this.user.findAllGroups(
        isMiniView
      );

      res.status(200).json({
        data: findAllGroupsData,
        message: "Groups Successfully loaded!",
      });
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;
