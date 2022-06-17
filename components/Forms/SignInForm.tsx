import { Formik, Form, Field, FieldAttributes } from "formik";
import { SignInSchema } from "@lib/validationSchemas";
import { useState, FC, useEffect } from "react";
import { useAuth } from "@lib/hooks/useAuth";
import {
  ExclamationCircleIcon,
  CheckCircleIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/outline";

export const SignInForm = () => {
  const [message, setMessage] = useState("");
  const { isSubmitting, user, signIn } = useAuth();

  return (
    <Formik
      onSubmit={async (values, actions) => {
        try {
          actions.setSubmitting(true);
          await signIn(values.email, values.password);
          setMessage("Submitted successfully!");
          actions.resetForm();
        } catch (err) {
          console.log(err);
          setMessage("There was an error submitting!");
          // reset password field
          actions.setFieldValue("password", "", false);
          actions.setFieldTouched("password", false);
          //   actions.setFieldError("password", ":(");
        } finally {
          actions.setSubmitting(false);
        }
        // const res = await fetch("/api/register", {
        //   method: "POST",
        //   body: JSON.stringify(values),
        // });
        // console.log(await res.json());
        // console.log(values);
      }}
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={SignInSchema}
    >
      {(props) => (
        <Form>
          <div className="flex flex-col gap-y-2">
            <Field
              name="email"
              type="email"
              label="Email"
              placeholder="email"
              component={StyledInput}
            />
            <Field
              name="password"
              type="password"
              label="Password"
              placeholder="password"
              component={StyledInput}
            />
            <button
              className="py-3 text-white rounded-lg bg-gradient-to-r from-primary to-primary-light mt-4 hover:opacity-90 disabled:opacity-30"
              type="submit"
              disabled={
                isSubmitting ||
                Boolean(user) ||
                !props.isValid ||
                props.isSubmitting
              }
            >
              Submit
            </button>
            {message && <p>{message}</p>}
          </div>
        </Form>
      )}
    </Formik>
  );
};

const StyledInput: FC<FieldAttributes<any>> = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors, dirty, values }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  type,
  label,
  ...props
}) => {
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
                <ExclamationCircleIcon className="stroke-red-400" />
              )
            : values[field.name] && (
                <CheckCircleIcon className="stroke-green-500 dark:stroke-green-300" />
              )}
        </div>
        <input
          type={type}
          {...field}
          {...props}
          className="w-full px-4 pr-10 py-2 rounded-md peer-empty:pr-4"
        />
      </div>
    </div>
  );
};
