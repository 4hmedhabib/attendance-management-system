import * as yup from "yup";

export const getSessionsSchema = yup.object({
  studentId: yup.string().required(),
  firstName: yup.string().required(),
  middleName: yup.string().required(),
  lastName: yup.string().required(),
  semester: yup
    .object({
      label: yup.string().required(),
      value: yup.string().required(),
    })
    .required(),
  class: yup
    .object({
      label: yup.string().required(),
      value: yup.string().required(),
    })
    .required(),
  course: yup
    .object({
      label: yup.string().required(),
      value: yup.string().required(),
    })
    .required(),
  teacher: yup
    .object({
      label: yup.string().required(),
      value: yup.string().required(),
    })
    .required(),
});
