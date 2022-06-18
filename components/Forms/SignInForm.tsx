import { Formik, Form, Field } from "formik";
import { SignInSchema } from "@lib/validationSchemas";
import { useState } from "react";
import { useAuth } from "@lib/hooks/useAuth";
import { StyledInput } from "./StyledInputs";
import { resetInput } from "./utils";

export const SignInForm = () => {
  const [message, setMessage] = useState("");
  const { isSubmitting, user, signIn } = useAuth();

  return (
    <Formik
      onSubmit={async (values, actions) => {
        try {
          actions.setSubmitting(true);
          const { data } = await signIn(values.email, values.password);
          setMessage("Submitted successfully!");
          actions.resetForm();
        } catch (err) {
          //   console.log(err);
          setMessage("There was an error submitting!");
          // reset password field
          resetInput(actions, "password");
          // actions.setFieldValue("password", "", false);
          // actions.setFieldTouched("password", false);
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
                props.isSubmitting ||
                props.values === props.initialValues
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
