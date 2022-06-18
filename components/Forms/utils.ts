import { FormikHelpers, FormikValues } from "formik";

export const resetInput = <T extends { [key: string]: string }>(
  actions: FormikHelpers<T>,
  fieldName: keyof T
) => {
  fieldName = String(fieldName);
  actions.setFieldValue(fieldName, "", false);
  actions.setFieldTouched(fieldName, false);
};
