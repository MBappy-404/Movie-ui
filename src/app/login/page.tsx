import LoginForm from "@/components/modules/auth/login/LoginForm";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Login | CineVerse - Access Your Account",
  description: "Log in to your CineVerse account to access your personalized movie recommendations, watchlist, and more. Secure and easy sign-in process.",
};

const LoginPage = () => {
  return (
    <div>
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
};

export default LoginPage;
