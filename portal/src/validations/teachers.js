import * as yup from "yup";

export const createTeacherSchema = yup.object({
  firstName: yup.string().required(),
  middleName: yup.string().required(),
  lastName: yup.string().required(),
  mobileNo: yup.string().required(),
  teacherId: yup.string().required(),
});

export const updateTeacherSchema = yup.object({
  firstName: yup.string().required(),
  middleName: yup.string().required(),
  lastName: yup.string().required(),
  mobileNo: yup.string().required(),
  teacherId: yup.string().required(),
});
