import { NextPage } from "next";
import { RegisterForm } from "@components/RegisterForm";
import MainLayout from "layouts/MainLayout";

const Register: NextPage = () => {
  return (
    <MainLayout>
      <RegisterForm />
    </MainLayout>
  );
};

export default Register;
