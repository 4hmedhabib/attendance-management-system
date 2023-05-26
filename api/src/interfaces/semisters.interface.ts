import { IUser } from "./users.interface";

export interface ISemister {
  semisterid?: number;
  semistername?: string;
  semisterslug: string;
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

export interface IRPCreateSemisterPayload {
  semisterName: string;
  semisterSlug: string;
  description?: string;
}

export interface IRBCreateSemister {
  payload: IRPCreateSemisterPayload;
}
