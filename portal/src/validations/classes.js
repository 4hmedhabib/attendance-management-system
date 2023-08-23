import * as yup from "yup";

export const createClassSchema = yup.object({
  className: yup.string().required(),
  description: yup.string(),
  shiftSlug: yup
    .object({
      label: yup.string().required(),
      value: yup.string().required(),
    })
    .required(),
  facultySlug: yup
    .object({
      label: yup.string().optional(),
      value: yup.string().optional(),
    })
    .required(),
});

export const updateClassSchema = yup.object({
  className: yup.string().required(),
  description: yup.string(),
  shiftSlug: yup
    .object({
      label: yup.string().required(),
      value: yup.string().required(),
    })
    .required(),
  facultySlug: yup
    .object({
      label: yup.string().optional(),
      value: yup.string().optional(),
    })
    .required(),
});

export const createClassSemesterSchema = yup.object({
  className: yup.string().required(),
  semester: yup
    .object({
      label: yup.string().required(),
      value: yup.string().required(),
    })
    .required(),
  startDate: yup
    .date()
    .required(),
  endDate: yup
    .date()
    .required(),
});