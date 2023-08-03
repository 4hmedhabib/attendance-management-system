import * as yup from "yup";

export const createEnrollmentSchema = yup.object({
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

export const updateEnrollmentSchema = yup.object({
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
