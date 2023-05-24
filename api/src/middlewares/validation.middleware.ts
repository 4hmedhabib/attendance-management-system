import { plainToInstance } from "class-transformer";
import { ValidationError, validate } from "class-validator";
import { RequestHandler } from "express";
import { HttpException } from "../exceptions/httpException";

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
        const message: any = errors.map((error: ValidationError) => {
          let objectError: any = {};

          // First level error
          if (error.children && error.children.length > 0) {
            // Second level error
            error.children.map((error: ValidationError) => {
              if (error.children && error.children.length > 0)
                // Third level error
                error.children.map(
                  (error: ValidationError) =>
                    (objectError[error.property] = Object.values(
                      error.constraints
                    ))
                );
              else
                objectError[error.property] = Object.values(error.constraints);
            });
          } else objectError[error.property] = Object.values(error.constraints);

          return objectError;
        });

        next(new HttpException(400, message));
      } else {
        next();
      }
    });
  };
};
