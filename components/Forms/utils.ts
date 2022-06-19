import { FormikHelpers, FormikValues } from "formik";
import { KeyboardEvent, KeyboardEventHandler } from "react";

export const resetInput = <T extends { [key: string]: string }>(
  actions: FormikHelpers<T>,
  fieldName: keyof T
) => {
  fieldName = String(fieldName);
  actions.setFieldValue(fieldName, "", false);
  actions.setFieldTouched(fieldName, false);
};

export const onEnterDown = (
  e: KeyboardEvent<HTMLFormElement>,
  button: HTMLButtonElement | null
) => {
  if (e.code === "Enter") {
    e.preventDefault();
    button?.setAttribute("style", "opacity: 70%;");
    button?.click();
  }
};

export const onEnterUp = (
  e: KeyboardEvent<HTMLFormElement>,
  button: HTMLButtonElement | null
) => {
  if (e.code === "Enter") {
    e.preventDefault();
    button?.removeAttribute("style");
  }
};
