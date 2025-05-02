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
import { registerValidation } from "./registerValidation";
import { registerUser } from "@/services/AuthServices";
import { toast } from "sonner";
import { motion } from "framer-motion";

const RegisterForm = () => {
  const form = useForm({
    resolver: zodResolver(registerValidation),
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    try {
      const result = await registerUser(data);
      if (result?.success) {
        toast.success(result.message);
        console.log(result);
      } else {
        toast.error(result?.message);
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
        className="bg-black/70 p-8 rounded-lg border-2 w-full max-w-sm shadow-xl backdrop-blur"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <motion.h1
          className="text-center text-3xl font-bold text-[#16a34a] mb-4 tracking-widest"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          REGISTER FORM
        </motion.h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <Label className="text-white">Name</Label>
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
              name="email"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <Label className="text-white">Email</Label>
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
                      className="bg-gray-800 text-white"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contactNumber"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <Label className="text-white">Contact Number</Label>
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

            <motion.div whileHover={{ scale: 1.05 }}>
              <Button
                type="submit"
                className="w-full bg-[#16a34a] hover:bg-green-700 mt-6 shadow-lg"
              >
                {isSubmitting ? "REGISTERING..." : "REGISTER"}
              </Button>
            </motion.div>
          </form>
        </Form>

        <p className="text-center mt-4 text-white">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-[#16a34a] font-semibold hover:underline"
          >
            LOGIN HERE
          </a>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default RegisterForm;
