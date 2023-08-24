import { plainToInstance } from "class-transformer";
import { ValidationError, validate } from "class-validator";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { HttpException } from "../exceptions/httpException";
import { logger } from "../utils";
import { IRequest } from "../interfaces";

/**
 * @name ValidationMiddleware
 * @description Allows use of decorator and non-decorator based validation
 * @param type dto
 * @param skipMissingProperties When skipping missing properties
 * @param whitelist Even if your object is an instance of a validation class it can contain additional properties that are not defined
 * @param forbidNonWhitelisted If you would rather to have an error thrown when any non-whitelisted properties are present
 */
export const ValidationMiddleware = (
  type: any,
  value: string | "body" | "query" | "params" = "body",
  skipMissingProperties = false,
  whitelist = true,
  forbidNonWhitelisted = true
): RequestHandler => {
  return (req, res, next) => {
    validate(plainToInstance(type, req[value]), {
      skipMissingProperties,
      whitelist,
      forbidNonWhitelisted,
    }).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        try {
          const message: any = getValidationErrorMessage(errors);

          next(new HttpException(400, message));
        } catch (err) {
          logger.error(`VALIDATION EXCEPTION: ${JSON.stringify(err)}`);
          next(
            new HttpException(
              501,
              "Something went wrong, please contact support team."
            )
          );
        }
      } else {
        next();
      }
    });
  };
};

const getValidationErrorMessage = (errors: ValidationError[]) => {
  let _errors = [];

  errors.map((error) => {
    if (error.children && error.children.length > 0) {
      _errors = [..._errors, ...getValidationErrorMessage(error.children)];
      return;
    }
    _errors.push({ [error.property]: Object.values(error.constraints) });
  });

  return _errors;
};

export function isSessionValid(
  req: IRequest | Request,
  res: Response,
  next: NextFunction
) {
  if (
    req.session &&
    req.session.user &&
    (global as any).activeTokens[req.session.user.username] &&
    (global as any).activeTokens[req.session.user.username].token ==
      req.cookies.token
  ) {
    // session valid
    next();
  } else if (
    (global as any).activeTokens[req.cookies.username] &&
    (global as any).activeTokens[req.cookies.userName].token ===
      req.cookies.token
  ) {
    // session Valid , for reporting server
    next();
  } else if (req.url == "/") {
    // ist time login
    res.clearCookie("token");
    res.clearCookie("encrypt");

    console.log("Fail to validate SessionOne");
  } else if (req.method == "POST") {
    res.clearCookie("token");
    res.clearCookie("encrypt");
    console.log("Fail to validate SessionTwo");

    next(new HttpException(409, "Your session has been expired"));
  } else {
    res.clearCookie("token");
    res.clearCookie("encrypt");
    next("Your session has been expired");
  }
}
