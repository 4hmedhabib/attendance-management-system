import { Request } from "express";
import { Session } from "express-session";

export * from "./classes.interface";
export * from "./courses.interface";
export * from "./custom.decorator";
export * from "./faculties.interface";
export * from "./routes.interface";
export * from "./semesters.interface";
export * from "./shifts.interface";
export * from "./students.interface";
export * from "./teachers.interface";
export * from "./users.interface";
export * from "./auth.interface";

export interface IRequest<TBody = any, TSession extends Session = any>
  extends Request {
  session: TSession;
  body: TBody;
}
