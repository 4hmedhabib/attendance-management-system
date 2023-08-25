import * as yup from "yup";

export const createUserSchema = yup.object({
  username: yup.string().required(),
  mobileNo: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required('Password is required'),
  passwordConfirmation: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
  firstName: yup.string().required(),
  middleName: yup.string().required(),
  lastName: yup.string().required(),
  group: yup
    .object({
      label: yup.string().required(),
      value: yup.string().required(),
    })
    .required(),
  isAdmin: yup
    .object({
      label: yup.string().required(),
      value: yup.string().required(),
    })
    .required(),
  teacherId: yup.string().required(),
});

export const updateUserSchema = yup.object({
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
