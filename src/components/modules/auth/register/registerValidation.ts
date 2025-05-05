import { z } from "zod";

export const registerValidation = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must not exceed 20 characters"),
  contactNumber: z.string(),
  profilePhoto: z.instanceof(File, { message: "Please upload a profile photo" })
    .refine((file) => file.size <= 5 * 1024 * 1024, "File size must be less than 5MB")
    .refine(
      (file) => ["image/jpeg", "image/png", "image/jpg"].includes(file.type),
      "Only .jpg, .jpeg, and .png files are allowed"
    )
});
