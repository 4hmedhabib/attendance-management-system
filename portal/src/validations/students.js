import * as yup from "yup";

export const createStudentSchema = yup.object({
  firstName: yup.string().required(),
  middleName: yup.string().required(),
  lastName: yup.string().required(),
  mobileNo: yup.string().required(),
  studentId: yup.string().required(),
  yearOfStudy: yup.number().required(),
});

export const updateStudentSchema = yup.object({
  firstName: yup.string().required(),
  middleName: yup.string().required(),
  lastName: yup.string().required(),
  mobileNo: yup.string().required(),
  studentId: yup.string().required(),
  yearOfStudy: yup.number().required(),
});
