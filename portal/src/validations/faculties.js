import * as yup from "yup";

export const createFacultySchema = yup.object({
  facultyName: yup.string().required(),
  description: yup.string(),
  manager: yup
    .object({
      label: yup.string().required(),
      value: yup.string().required(),
    })
    .required(),
  deputy: yup
    .object({
      label: yup.string().optional(),
      value: yup.string().optional(),
    })
    .optional(),
});

export const updateFacultySchema = yup.object({
  facultyName: yup.string().required(),
  description: yup.string(),
  manager: yup
    .object({
      label: yup.string().required(),
      value: yup.string().required(),
    })
    .required(),
  deputy: yup
    .object({
      label: yup.string().optional(),
      value: yup.string().optional(),
    })
    .optional(),
});
