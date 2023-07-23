import { IUser } from "./users.interface";

export interface ICourse {
  courseid?: number;
  coursename?: string;
  courseslug: string;
  description?: string | null;
  createdat?: string | Date;
  updatedat?: string | Date;
  createdby?: IUser;
  updatedby?: IUser | null;
  manager?: IUser;
  deputy?: IUser | null;
  _count?: {
    semesters?: number;
  };
}

export interface IRPCreateCoursePayload {
  courseName: string;
  courseSlug: string;
  description?: string;
}

export interface IRBCreateCourse {
  payload: IRPCreateCoursePayload;
}
