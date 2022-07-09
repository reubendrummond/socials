import { FormikHelpers } from "formik";
import { FC } from "react";
import { FieldError } from "react-hook-form";

export const resetInput = <T extends { [key: string]: string }>(
  actions: FormikHelpers<T>,
  fieldName: keyof T
) => {
  fieldName = String(fieldName);
  actions.setFieldValue(fieldName, "", false);
  actions.setFieldTouched(fieldName, false);
};

type ChildrenRenderProps<T extends {}> = (t: T) => React.ReactNode;

interface StyledInputProps {
  error?: FieldError;
  isDirty?: boolean;
  isTouched?: boolean;

  children:
    | React.ReactNode
    | ChildrenRenderProps<{
        error: string;
        isValid: boolean;
        shouldDisplayError: boolean;
      }>;
}

export const StyledInput: FC<StyledInputProps> = ({
  children,
  isDirty = true,
  isTouched = true,
  error,
  ...props
}) => {
  const isValid = Boolean(isDirty && !error);
  const shouldDisplayError = Boolean(!isValid && isTouched);

  if (typeof children !== "function") return <>{children}</>;

  return (
    <>
      {children({
        error: error?.message || "",
        isValid,
        shouldDisplayError,
      })}
    </>
  );
};
