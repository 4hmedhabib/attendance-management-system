import * as yup from "yup";

export const createCourseSchema = yup.object({
  courseName: yup.string().required(),
  description: yup.string(),
});

export const updateCourseSchema = yup.object({
  courseName: yup.string().required(),
  description: yup.string(),
});
