import { IClass } from "./classes.interface";
import { ICourse } from "./courses.interface";
import { ISemester } from "./semesters.interface";
import { ITeacher } from "./teachers.interface";
import { IUser } from "./users.interface";
export interface IStudent {
  studentid?: number;
  stdid?: string;
  firstname?: string;
  middlename?: string;
  lastname?: string;
  mobileno?: string;
  createdat?: Date | string;
  updatedat?: Date | string;

  createdby?: IStudent;
  updatedby?: IStudent;
}

export interface IRPCreateStudentPayload {
  firstName: string;
  middleName: string;
  lastName: string;
  studentId: string;
  mobileNo: string;
  yearOfStudy: 1;
}

export interface IRBCreateStudent {
  payload: IRPCreateStudentPayload;
}

export interface IRBCreateStudent {
  payload: IRPCreateStudentPayload;
}

export interface IEnrollment {
  enrollment_id?: number;
  enrollment_date?: string | Date;

  student?: IStudent;
  teacher?: ITeacher;
  course?: ICourse;
  semester?: ISemester;
  class?: IClass;

  created_at?: string | Date;
  updated_at?: string | Date;

  createdby?: IUser;
  updatedby?: IUser;
}
