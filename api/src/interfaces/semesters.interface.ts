import { IUser } from "./users.interface";

export interface ISemester {
  semesterid?: number;
  semestername?: string;
  semesterslug: string;
  description?: string | null;
  createdat?: string | Date;
  updatedat?: string | Date;
  createdby?: IUser;
  updatedby?: IUser | null;
  manager?: IUser;
  deputy?: IUser | null;
  _count?: {
    courses?: number;
    classes?: number;
  };
}

export interface IRPCreateSemesterPayload {
  semesterName: string;
  semesterSlug: string;
  description?: string;
}

export interface IRBCreateSemester {
  payload: IRPCreateSemesterPayload;
}
