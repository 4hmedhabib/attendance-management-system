import signature from "cookie-signature";
import { NextFunction, Request, Response } from "express";

import { IAuthLogin, IRequest } from "../interfaces/";
import { AuthService } from "../services/";
import { LoginDto, LoginPayloadDto } from "../dtos/auth.dto";
import { genKey, sessionTimerTick, startSession } from "../utils";
import * as config from "../config";

(global as any).activeTokens = [];

class AuthController {
  public authSrv = new AuthService();

  public login = async (
    req: IRequest<LoginDto, any>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const payload: LoginPayloadDto = req.body.payload;

      const loginData: IAuthLogin = await this.authSrv.login(payload);

      let token = genKey({
        userName: loginData.user.username,
        userFullName: `${loginData?.user?.firstname} ${loginData?.user?.middlename} ${loginData?.user?.lastname}`,
        userId: loginData.user.userid,
      });
      console.log("cookie: " + token);

      let tokenRef: any;

      if (req.session && req.session?.user && req.session?.user?.username) {
        tokenRef = (global as any).activeTokens[req.session.user.username];
      }

      if (tokenRef && tokenRef.lifetimer) {
        clearTimeout(tokenRef.lifetimer);
      }

      req.session.user = loginData.user;
      req.session.group = loginData.group;
      req.session.user.token = token; // server session;

      let logoutTimer: any;

      logoutTimer = setTimeout(
        sessionTimerTick,
        config.maxSessionExpire,
        req.session.user.username,
        token
      );

      req.session.cookie.expires = new Date(
        Date.now() + config.maxSessionExpire
      );

      (global as any).activeTokens[loginData?.user?.username] = {
        lifeTimer: logoutTimer,
        token: token,
      };

      // cookie will always be set in the browser
      res.cookie("token", token, {
        maxAge: config.maxSessionExpire,
        httpOnly: true,
        secure: config.isSecure,
      });

      res.cookie("encrypt", false, {
        maxAge: config.maxSessionExpire,
        httpOnly: true,
        secure: config.isSecure,
      });

      startSession(req.session.user.username, token);

      let signed =
        "s:" +
        signature.sign(req.sessionID, config.SECRET_KEY || "signature003");
      let encode = encodeURIComponent;

      signed = encode(signed);

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
