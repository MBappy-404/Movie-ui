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
import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const RegisterForm = () => {
  const form = useForm({
    resolver: zodResolver(registerValidation),
  });


  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirectPath");
  const router = useRouter();

  const [preview, setPreview] = useState<string | null>(null);
  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const formData = new FormData();

      // Append text data
      const { profilePhoto, ...otherData } = data;
      formData.append("data", JSON.stringify(otherData));

      // Append file if exists
      if (profilePhoto instanceof File) {
        formData.append("file", profilePhoto);
      }

      const result = await registerUser(formData);
      if (result?.success) {
        toast.success(result.message);
        if (redirect) {
          router.push('/login');
        } else {
          router.push("/login");
        }
      } else {
        toast.error(result?.message);
      }
      return result;
    } catch (error: any) {
      toast.error(error.message || "Registration failed");
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
        className="bg-black/70 p-8 rounded-lg border-2 border-blue-500 w-full max-w-xl shadow-xl backdrop-blur"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <motion.h1 className="text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent text-3xl font-bold  mb-4 tracking-widest">
          REGISTER FORM
        </motion.h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* Name & Email */}
            <div className="flex flex-col md:flex-row gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="mt-4 md:w-1/2">
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
                  <FormItem className="mt-4 md:w-1/2">
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
            </div>

            {/* Password & Contact */}
            <div className="flex flex-col md:flex-row gap-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="mt-4 md:w-1/2">
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
                  <FormItem className="mt-4 md:w-1/2">
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
            </div>

            {/* Profile Photo & Preview */}
            <div className="flex flex-col md:flex-row gap-4 items-center mt-4">
              <FormField
                control={form.control}
                name="profilePhoto"
                render={({ field }) => (
                  <FormItem className="w-full md:w-1/2">
                    <Label className="text-white">Profile Photo</Label>
                    <FormControl>
                      <Input
                        id="picture"
                        type="file"
                        accept="image/*"
                        className="bg-gray-800 text-white"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            field.onChange(file);
                            const imageUrl = URL.createObjectURL(file);
                            setPreview(imageUrl);
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              {preview && (
                <div className="w-full md:w-1/2 flex justify-center mt-4 md:mt-0">
                  <img
                    src={preview}
                    alt="Profile Preview"
                    className="w-32 h-32 object-cover rounded-full border-2 border-gray-300"
                  />
                </div>
              )}
            </div>

            <motion.div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r cursor-pointer from-blue-500 to-purple-500 mt-6 shadow-lg"
              >
                {isSubmitting ? "REGISTERING..." : "REGISTER"}
              </Button>
            </motion.div>
          </form>
        </Form>

        <p className="text-center mt-4 text-white">
          Already have an account?{" "}
          <Link
            href="/login"
            className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent font-semibold hover:underline"
          >
            LOGIN HERE
          </Link>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default RegisterForm;
