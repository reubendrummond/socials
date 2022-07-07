import { Formik, Form, Field } from "formik";
import { RegisterSchema } from "@lib/forms/validationSchemas";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@lib/hooks/useAuth";
import { StyledInput, SubmitButton } from "./StyledInputs";
import { onEnterDown, onEnterUp, resetInput } from "./utils";

export const RegisterForm = () => {
  const [message, setMessage] = useState("");
  const { register, isSubmitting, user } = useAuth();
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <Formik
      onSubmit={async (values, actions) => {
        register(values.email, values.password)
          .then(({ data }) => {
            setMessage(data.message);
            actions.resetForm();
          })
          .catch((e) => {
            // console.error(e);
            if (e instanceof Error) {
              setMessage(e.message);
            } else {
              setMessage("There was an error. Please try again.");
            }
            resetInput(actions, "password");
            resetInput(actions, "passwordConfirm");
          })
          .finally(() => {
            actions.setSubmitting(false);
          });
      }}
      initialValues={{
        email: "",
        password: "",
        passwordConfirm: "",
      }}
      validationSchema={RegisterSchema}
    >
      {(props) => (
        <Form
        // onKeyDown={(e) => onEnterDown(e, submitButtonRef.current)}
        // onKeyUp={(e) => onEnterUp(e, submitButtonRef.current)}
        >
          <div className="flex flex-col gap-y-2">
            <Field
              type="text"
              name="email"
              label="Email"
              placeholder="email"
              component={StyledInput}
            />
            <Field
              type="password"
              name="password"
              label="Password"
              placeholder="password"
              component={StyledInput}
            />
            <Field
              type="password"
              name="passwordConfirm"
              label="Confirm password"
              placeholder="confirm password"
              component={StyledInput}
            />
            <SubmitButton
              type="submit"
              ref={submitButtonRef}
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
