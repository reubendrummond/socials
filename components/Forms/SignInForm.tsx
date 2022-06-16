import { Formik, Form, Field, FieldAttributes } from "formik";
import { SignInSchema } from "@lib/validationSchemas";
import { useState, FC } from "react";
import { sign } from "crypto";
import { useAuth } from "@lib/hooks/useAuth";

export const SignInForm = () => {
  const [message, setMessage] = useState("");
  const { isSubmitting, user, signIn } = useAuth();

  return (
    <Formik
      onSubmit={async (values, actions) => {
        actions.setSubmitting(true);
        const res = await signIn(values.email, values.password);
        // const res = await fetch("/api/register", {
        //   method: "POST",
        //   body: JSON.stringify(values),
        // });
        // console.log(await res.json());
        console.log(values);
        if (true) {
          setMessage("Submitted successfully!");
          actions.resetForm();
        } else {
          setMessage("There was an error submitting!");
        }
        actions.setSubmitting(false);
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
            {props.dirty && props.touched.email && props.errors.email}
            <Field
              name="password"
              type="password"
              label="Password"
              placeholder="password"
              component={StyledInput}
            />
            {props.dirty && props.touched.password && props.errors.password}
            <button
              className="py-3 rounded-lg bg-gradient-to-r from-primary to-primary-light mt-4 hover:opacity-90 disabled:opacity-30"
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
  form: { touched, errors, dirty }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  type,
  label,
  ...props
}) => (
  <div className="flex flex-col gap-y-1">
    <label htmlFor={field.name}>{label}</label>
    <input type={type} {...field} {...props} className="px-4 py-2 rounded-md" />
    {props.dirty && touched[field.name] && errors[field.name] && (
      <div className="error">{errors[field.name]}</div>
    )}
  </div>
);
