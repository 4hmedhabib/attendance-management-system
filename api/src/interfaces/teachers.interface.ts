export interface ITeacher {
  teacherid?: number;
  stdid?: string;
  firstname?: string;
  middlename?: string;
  lastname?: string;
  mobileno?: string;
  createdat?: Date | string;
  updatedat?: Date | string;

  createdby?: ITeacher;
  updatedby?: ITeacher;
}

export interface IRPCreateTeacherPayload {
  firstName: string;
  middleName: string;
  lastName: string;
  teacherId: string;
  mobileNo: string;
  yearOfStudy: 1;
}

export interface IRBCreateTeacher {
  payload: IRPCreateTeacherPayload;
}
