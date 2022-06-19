import { Formik, Form, Field } from "formik";
import { RegisterSchema } from "@lib/validationSchemas";
import { useState, useRef } from "react";
import { useAuth } from "@lib/hooks/useAuth";
import { StyledInput } from "./StyledInputs";
import { onEnterDown, onEnterUp, resetInput } from "./utils";

export const RegisterForm = () => {
  const [message, setMessage] = useState("");
  const { register } = useAuth();
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
          onKeyDown={(e) => onEnterDown(e, submitButtonRef.current)}
          onKeyUp={(e) => onEnterUp(e, submitButtonRef.current)}
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
            <button
              className="py-3 text-white rounded-lg bg-gradient-to-r from-primary to-primary-light mt-4 active:opacity-70 hover:opacity-90 disabled:opacity-30"
              type="submit"
              ref={submitButtonRef}
              disabled={
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
