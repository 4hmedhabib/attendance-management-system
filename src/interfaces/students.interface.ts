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
