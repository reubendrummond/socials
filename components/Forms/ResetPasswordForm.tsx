import { Formik, Form, Field } from "formik";
import { ResetPasswordSchema } from "@lib/validationSchemas";
import { useState } from "react";
import { useAuth } from "@lib/hooks/useAuth";
import { StyledInput, SubmitButton } from "./StyledInputs";
import { resetInput } from "./utils";

export const ResetPasswordForm = () => {
  const [message, setMessage] = useState("");
  const { isSubmitting, user, resetPassword } = useAuth();

  return (
    <Formik
      onSubmit={async (values, actions) => {
        console.log(values.email);
        resetPassword(values.email)
          .then(({ data }) => {
            setMessage(data.message);
            actions.resetForm();
          })
          .catch((e) => {
            if (e instanceof Error) {
              setMessage(e.message);
            } else {
              setMessage("There was an error. Please try again.");
            }
            resetInput(actions, "email");
          })
          .finally(() => {
            actions.setSubmitting(false);
          });
      }}
      initialValues={{
        email: "",
      }}
      validationSchema={ResetPasswordSchema}
    >
      {(props) => (
        <Form>
          <div className="flex flex-col gap-y-2">
            <Field
              type="text"
              name="email"
              label="Email"
              placeholder="email"
              component={StyledInput}
            />
            <SubmitButton
              type="submit"
              disabled={
                !props.isValid ||
                Boolean(user) ||
                props.isSubmitting ||
                props.values === props.initialValues ||
                isSubmitting
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
