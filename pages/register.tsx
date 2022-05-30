import { NextPage } from "next";
import { Formik, Form, Field, setNestedObjectValues } from "formik";
import { RegisterSchema, RegisterData } from "@lib/validationSchemas";

const Register: NextPage = () => {
  return (
    <Formik
      onSubmit={async (values, actions) => {
        const res = await fetch("/api/register", {
          method: "POST",
          body: JSON.stringify(values),
        });

        console.log(await res.json());

        actions.setSubmitting(false);
        actions.resetForm();
      }}
      initialValues={{
        name: "",
        email: "",
        title: "",
        age: "",
      }}
      validationSchema={RegisterSchema}
    >
      {(props) => (
        <Form>
          <div className="flex flex-col">
            <label htmlFor="name">name</label>
            <Field name="name" type="text" />
            {props.dirty && props.touched.name && props.errors.name}
            <label htmlFor="email">email</label>
            <Field name="email" type="email" />
            {props.dirty && props.touched.email && props.errors.email}
            <label htmlFor="title">title</label>
            <Field name="title" type="text" />
            {props.dirty && props.touched.title && props.errors.title}
            <label htmlFor="age">age</label>
            <Field name="age" type="number" />
            {props.dirty && props.touched.age && props.errors.age}
            <button
              type="submit"
              disabled={!props.isValid || props.isSubmitting}
            >
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Register;
