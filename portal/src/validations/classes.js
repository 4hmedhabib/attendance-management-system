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


export const createClassSemesterCoursesSchema = yup.object({
  className: yup.string().required(),
  semester: yup.string().required(),
  courses: yup.array().of(yup
    .object({
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
    })
    .required()
  ).min(1, 'courses field must have at least 1 course')
});