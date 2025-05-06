import RegisterForm from "@/components/modules/auth/register/RegisterForm";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Register | CineVerse - Create Your Account",
  description: "Sign up for CineVerse to start exploring movies, create your watchlist, and enjoy personalized recommendations. Join now for free access!",
};


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
