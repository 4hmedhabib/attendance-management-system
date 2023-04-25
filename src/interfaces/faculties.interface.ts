import { IUser } from "./users.interface";

export interface IFaculty {
  facultyid?: number;
  facultyname?: string;
  facultyslug: string;
  description?: string | null;
  createdat?: string | Date;
  updatedat?: string | Date;
  createdby?: IUser;
  updatedby?: IUser | null;
  manager?: IUser;
  deputy?: IUser | null;
  _count?: {
    shifts?: number;
  };
}

export interface IRPCreateFacultyPayload {
  facultyName: string;
  facultySlug: string;
  description?: string;
  manager: string;
  deputy?: string;
}

export interface IRBCreateFaculty {
  payload: IRPCreateFacultyPayload;
}
