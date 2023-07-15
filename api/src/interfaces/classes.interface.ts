import { ISemester } from "./semesters.interface";
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
    semesters?: number;
    students?: number;
  };
}

export interface IClassSemester {
  class?: IClass;
  semester?: ISemester;
  startdate?: string | Date;
  enddate?: string | Date;
  assignedBy?: IUser;
}

export interface IClassSemesterCourses {}

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

export interface IAttendances {
  attendanceid?: number;
  enrollmentid?: number;
}

export interface IAttendanceStatus {
  statusid?: number;
  statusname?: string;
  statusslug?: string;
}
