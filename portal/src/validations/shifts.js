import * as yup from "yup";

export const createShiftSchema = yup.object({
  shiftName: yup.string().required(),
  description: yup.string(),
});

export const updateShiftSchema = yup.object({
  shiftName: yup.string().required(),
  description: yup.string(),
});
