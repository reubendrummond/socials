import { Formik, Form, Field } from "formik";
import { SignInSchema } from "@lib/forms/validationSchemas";
import { useState } from "react";
import { useAuth } from "@lib/hooks/useAuth";
import { StyledInput, SubmitButton } from "./Formik/StyledInputs";
import { resetInput } from "./utils";
import Link from "next/link";

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
          setMessage("There was an error submitting!");
          resetInput(actions, "password");
        } finally {
          actions.setSubmitting(false);
        }
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
              disabled={true}
            />
            <Field
              name="password"
              type="password"
              label="Password"
              placeholder="password"
              component={StyledInput}
              disabled={true}
            />
            <Link href="/auth/reset" passHref>
              <a className="text-sm underline w-fit ml-auto">
                Forgot Password?
              </a>
            </Link>
            <SubmitButton
              className="py-3 text-white rounded-lg bg-gradient-to-r from-primary to-primary-light mt-4 hover:opacity-90 disabled:opacity-30"
              type="submit"
              disabled={
                true ||
                isSubmitting ||
                Boolean(user) ||
                !props.isValid ||
                props.isSubmitting ||
                props.values === props.initialValues
              }
            >
              Submit
            </SubmitButton>
            {message && <p>{message}</p>}
          </div>
        </Form>
      )}
    </Formik>
  );
};
