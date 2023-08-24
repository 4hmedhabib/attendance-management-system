import bcrypt from "bcrypt";
import { NextFunction, Response } from "express";
import { logger } from "./logger";
import { IRequest } from "../interfaces";

export * from "./logger";
export * from "./validateEnv";

export * from "./common";

import * as config from "../config";

(global as any).activeSessions = {};
(global as any).activeSessionCounter = 0;

let pool: any;

export function sessionTimerTick(userName: string, token: string) {
  console.log(
    "Session Timmer tick for user (%s) , loggedIn from : %s",
    userName,
    (global as any).activeTokens[userName as any].loginIp
  );
  stopSession(userName);
  expireToken(userName, token);
}

export function startSession(sessionId: string | number, token: string) {
  logger.debug("Session Started with Session ID : " + sessionId);
  (global as any).activeSessions[sessionId] = {
    sessionId: sessionId,
    token: token,
  };
  (global as any).activeSessionCounter++;
  displayActiveSessions();
}

export function updateSessionLife(
  req: IRequest,
  res: Response,
  next: NextFunction
) {
  // delete the session of user if the timeout reach
  if (
    req.session.user &&
    (global as any).activeTokens[req.session.user.userName]
  ) {
    let tokenRef = (global as any).activeTokens[req.session.user.userName];
    if (tokenRef && tokenRef.lifeTimer) {
      clearTimeout(tokenRef.lifeTimer);

      tokenRef.lifeTimer = setTimeout(
        sessionTimerTick,
        config.maxSessionExpire,
        req.session.user.userName,
        req.session.user.token
      );

      (global as any).activeTokens[req.session.user.userName] = tokenRef;
      req.session.cookie.expires = new Date(
        Date.now() + config.maxSessionExpire
      );
      req.session.cookie.maxAge = config.maxSessionExpire;

      res.cookie("token", req.cookies.token, {
        maxAge: config.maxSessionExpire,
        httpOnly: true,
        secure: config.isSecure,
      });

      res.cookie("encrypt", false, {
        maxAge: config.maxSessionExpire,
        httpOnly: true,
        secure: config.isSecure,
      });
    }
  }
  next();
}

export function stopSession(sessionId: string | number) {
  if (sessionId) {
    delete (global as any).activeSessions[sessionId];

    printActiveSessions();

    if ((global as any).activeSessionCounter > 0)
      (global as any).activeSessionCounter--;
  }
}

export function expireToken(userName: string, token: string) {
  let index = (global as any).activeTokens[userName as any];
  if (index && (global as any).activeTokens[userName as any].token == token) {
    // sessionManager.stopSession(token);
    console.log(
      "session expire for user (%s) , loggedIn from : %s",
      userName,
      (global as any).activeTokens[userName as any].loginIp
    );
    stopSession(userName);
    delete (global as any).activeTokens[userName as any];
  }
}

function printActiveSessions() {
  let arr = Object.keys((global as any).activeSessions).map(function (key) {
    return (global as any).activeSessions[key];
  });

  logger.debug("Active session on the PROXYEMS: " + arr);
}

function displayActiveSessions() {
  pool = setTimeout(function () {
    logger.debug(
      "Active Sessions on PROXYEMS : " + (global as any).activeSessionCounter
    );
    clearTimeout(pool);
    displayActiveSessions();
  }, 1 * 60000);
}

export async function hashPassword(plaintextPassword: string) {
  return await bcrypt.hash(plaintextPassword, 10);
}

// compare password
export async function comparePassword(plaintextPassword: string, hash: string) {
  const result = await bcrypt.compare(plaintextPassword, hash);
  return result;
}

export function genKey(data: any) {
  let ref = _random(10);
  let token = _random(10, data);
  token += ref;
  return token;
}

function _random(length: number, data: any = "") {
  let tmp = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let val = "";

  for (let i = 0; i < length; i++) {
    val += tmp.charAt(Math.floor(Math.random() * tmp.length));
  }

  return val;
}
