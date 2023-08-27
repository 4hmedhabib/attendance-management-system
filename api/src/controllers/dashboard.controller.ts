import { NextFunction, Response } from "express";

import { LoginDto } from "../dtos/auth.dto";
import { IAuthLogin, IRequest } from "../interfaces";
import { DashboardSrv } from "../services";

(global as any).activeTokens = [];

class AuthController {
  public dashboardSrv = new DashboardSrv();

  public login = async (
    req: IRequest<LoginDto, any>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const loginData: IAuthLogin = await this.dashboardSrv.dashboard();

      res.status(200).json({
        data: loginData,
        message: "Users Successfully loaded!",
      });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
