import { RegisterForm } from "@components/RegisterForm";
import { CustomNextPage } from "@lib/types/page";

const Register: CustomNextPage = () => {
  return <RegisterForm />;
};

Register.layout = "main";

export default Register;
