import { IFaculty } from "./faculties.interface";
import { IUser } from "./users.interface";

export interface IShift {
  shiftid?: number;
  shiftname?: string;
  shiftslug: string;
  description?: string | null;
  createdat?: string | Date;
  updatedat?: string | Date;
  createdby?: IUser;
  updatedby?: IUser | null;
  faculty?: IFaculty;
  _count?: {
    classes?: number;
  };
}

export interface IRPCreateShiftPayload {
  shiftName: string;
  shiftSlug: string;
  description?: string;
}

export interface IRBCreateShift {
  payload: IRPCreateShiftPayload;
}
