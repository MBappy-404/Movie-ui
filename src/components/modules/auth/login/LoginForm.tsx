"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { loginValidation } from "./loginValidation";
import { useRouter, useSearchParams } from "next/navigation";
import { loginUser } from "@/services/AuthServices";
import { useUser } from "@/components/context/UserContext";
import { motion } from "framer-motion";
import Link from "next/link";
import { useAppDispatch } from "@/components/redux/hooks";
import { setUser, setToken } from "@/components/redux/features/user/userState";

const LoginForm = () => {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirectPath");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const form = useForm({
    resolver: zodResolver(loginValidation),
  });
  const { setIsLoading } = useUser();

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const result = await loginUser(data);

      if (result?.success) {
        // Set user data in Redux
        dispatch(setUser(result.data.user));
        dispatch(setToken(result.data.accessToken));
        
        toast.success(result.message);
        if (redirect) {
          router.push(redirect);
          setIsLoading(true);
        } else {
          router.push("/");
        }
      } else {
        toast.error(result.message);
      }
      return result;
    } catch (error: any) {
      return Error(error);
    }
  };

  return (
    <motion.div
      className="flex justify-center items-center min-h-screen bg-[url('https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="bg-black/70 p-8 rounded-lg border-2 border-blue-400 w-full max-w-sm shadow-xl backdrop-blur"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <motion.h1 className="text-center text-3xl font-bold  bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent   mb-4 tracking-widest">
          LOGIN FORM
        </motion.h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <Label className="text-white">Email </Label>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value || ""}
                      className="bg-gray-800 text-white"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <Label className="text-white">Password</Label>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      value={field.value || ""}
                      className="bg-gray-800 text-white "
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <motion.div>
              <Button
                type="submit"
                className="w-full cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500    mt-6 shadow-lg"
              >
                {isSubmitting ? "LOGGING IN..." : "LOGIN"}
              </Button>
            </motion.div>
          </form>
        </Form>

        <p className="text-center mt-4 text-white">
          You have no account?{" "}
          <Link
            href="/register"
            className=" bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent font-semibold hover:underline"
          >
            REGISTER HERE
          </Link>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default LoginForm;
