import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions/httpException";
import { logger } from "../utils";

export const ErrorMiddleware = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const status: number = error.status || 500;
    logger.error(error);
    const message: string = error.message || "Something went wrong";

    logger.error(
      `[${req.method}] ${
        req.path
      } >> StatusCode:: ${status}, Message:: ${JSON.stringify(message)}`
    );
    res.status(status).json({ message });
  } catch (error) {
    next(error);
  }
};
