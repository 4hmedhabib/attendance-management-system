import { IFaculty } from "./faculties.interface";
import { IShift } from "./shifts.interface";
import { IUser } from "./users.interface";
export interface IAuthLogin {
  user: IUser;
  group: string;
}
