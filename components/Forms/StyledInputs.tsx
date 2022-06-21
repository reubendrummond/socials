import { ErrorMessage, FieldProps, FormikErrors } from "formik";
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  FC,
  forwardRef,
  PropsWithChildren,
} from "react";
import {
  ExclamationCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/outline";

interface StyledInput<T> extends FieldProps<T> {
  type: string;
  label: string;
  name: string;
  placeholder: string;
}

export const StyledInput = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors, dirty, values }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  label,
  ...props
}: StyledInput<any>) => {
  //   useEffect(() => {
  //     console.log(status);
  //   }, [values, field.name]);

  return (
    <div className="flex flex-col gap-y-1">
      <label htmlFor={field.name}>{label}</label>
      <div className="relative">
        <div className="peer absolute right-2 inset-y-0 w-6 flex items-center">
          {errors[field.name]
            ? dirty &&
              touched[field.name] && (
                <div className="relative">
                  <ExclamationCircleIcon className="peer w-full h-full hover:cursor-pointer stroke-red-400" />
                  <div className="absolute opacity-0 w-[100px] invisible peer-hover:visible peer-hover:opacity-100 left-[100%] bottom-[100%]">
                    {<DisplayError error={errors[field.name]} />}
                  </div>
                </div>
              )
            : values[field.name] && (
                <CheckCircleIcon className="stroke-green-500 dark:stroke-green-300" />
              )}
        </div>
        <input
          className="w-full px-4 pr-10 py-2 rounded-md peer-empty:pr-4"
          {...field}
          {...props}
        />
      </div>
    </div>
  );
};

const DisplayError = ({
  error,
}: {
  error:
    | string
    | FormikErrors<any>
    | string[]
    | FormikErrors<any>[]
    | undefined;
}) => {
  if (!error) return <></>;

  if (!Array.isArray(error)) {
    error = typeof error === "string" ? [error] : [error];
  }

  if (Array.isArray(error)) {
    error = error.map((e) => {
      return typeof e === "object" ? String(e) : e;
    });
  }

  return <div>{error.map((e) => e)}</div>;
};

export const SubmitButton = forwardRef<
  HTMLButtonElement,
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
>(function SubmitButton(props, ref) {
  return (
    <button
      className="py-3 text-white rounded-lg bg-gradient-to-r from-primary to-primary-light mt-4 active:opacity-70 hover:opacity-90 disabled:opacity-30"
      {...props}
      ref={ref}
    >
      {props.children}
    </button>
  );
});
