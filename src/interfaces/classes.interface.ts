import { IShift } from "./shifts.interface";
import { IUser } from "./users.interface";

export interface IClass {
  classid?: number;
  classname?: string;
  classslug: string;
  description?: string | null;
  createdat?: string | Date;
  updatedat?: string | Date;
  createdby?: IUser;
  updatedby?: IUser | null;
  shift?: IShift;
  _count?: {
    semisters?: number;
    students?: number;
  };
}

export interface IRPCreateClassPayload {
  className: string;
  classSlug: string;
  description?: string;
  shiftSlug: string;
  facultySlug: string;
}

export interface IRBCreateClass {
  payload: IRPCreateClassPayload;
}
