import { IFaculty } from "./faculties.interface";
import { IShift } from "./shifts.interface";
export interface IUser {
  userid?: number;
  username?: string;
  firstname?: string;
  middlename?: string;
  lastname?: string;
  mobile?: string;
  email?: string | null;
  password?: string;
  ispwdupgraded?: boolean;
  isstudent?: boolean;
  isteacher?: boolean;
  lastaccessdate?: Date | string | null;
  lastchangepwd?: Date | string | null;
  updatedusers?: IUser[];
  createdusers?: IUser[];
  createdshifts?: IShift;
  createdby?: IUser;
  updatedby?: IUser;
  updatedshifts?: IShift;
  facultymanager?: IFaculty;
  facultydeputy?: IFaculty;
}

export interface IRPCreateUserPayload {
  firstName: string;
  middleName: string;
  lastName: string;
  username: string;
  mobileNo: string;
  email: string;
  password: string;
  passwordConfirm: string;
  isStudent: boolean;
  isTeacher: boolean;
  group: string;
}

export interface IRBCreateUser {
  payload: IRPCreateUserPayload;
}
