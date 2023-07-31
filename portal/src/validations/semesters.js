import * as yup from "yup";

export const createSemesterSchema = yup.object({
  semesterName: yup.string().required(),
  description: yup.string(),
});

export const updateSemesterSchema = yup.object({
  semesterName: yup.string().required(),
  description: yup.string(),
});
