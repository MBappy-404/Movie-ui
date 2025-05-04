import RegisterForm from "@/components/modules/auth/register/RegisterForm";
import { Suspense } from "react";

const RegisterPage = () => {
  return (
    <div>
      <Suspense>
      <RegisterForm/>
      </Suspense>
    </div>
  );
};

export default RegisterPage;
