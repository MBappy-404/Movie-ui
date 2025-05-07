import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useUpdateUserMutation } from "@/components/redux/features/user/userApi";

interface User {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
  contactNumber: string;
  status: 'ACTIVE' | 'INACTIVE';
  profilePhoto?: string;
  createdAt: string;
  updatedAt: string;
}

interface UpdateUserModalProps {
  isUpdateModalOpen: boolean;
  setUpdateModalOpen: (isOpen: boolean) => void;
  user: User | null;
}

const UpdateUserModal = ({ isUpdateModalOpen, setUpdateModalOpen, user }: UpdateUserModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<User>();

  const [updateUser] = useUpdateUserMutation();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Set initial form values when user data is available
  useEffect(() => {
    if (user) {
      setValue("name", user.name);
      setValue("email", user.email);
      setValue("role", user.role);
      setValue("contactNumber", user.contactNumber);
      setValue("status", user.status);
      setPreviewImage(user.profilePhoto || null);
    }
  }, [user, setValue]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setProfilePhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setPreviewImage(null);
    setValue("profilePhoto", "");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onSubmit = async (data: User) => {
    const toastId = toast.loading("Updating User...", { duration: 2000 });

    try {
      const userData = {
        name: data.name,
        email: data.email,
        role: data.role,
        contactNumber: data.contactNumber,
        status: data.status,
      };

      const formData = new FormData();
      formData.append("data", JSON.stringify(userData));
      
      if (profilePhoto) {
        formData.append("file", profilePhoto);
      }

      const res = await updateUser({
        id: user?.id || "",
        data: formData
      }).unwrap();

      toast.success("User updated successfully!", { id: toastId });
      setUpdateModalOpen(false);
      reset();
      clearImage();
    } catch (error: any) {
      toast.error(error.message || "Failed to update user", { id: toastId });
    }
  };

  if (!isUpdateModalOpen || !user) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-lg z-50 mx-4"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl bg-[#000a3a] border border-[#1a2d6d] rounded-xl overflow-hidden"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="p-8 max-h-[90vh] overflow-y-auto">
          <h2 className="lg:text-2xl text-xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Update User
          </h2>

          {/* Image Upload */}
          <div className="mb-6">
            <div className="border-2 border-dashed border-[#1a2d6d] rounded-xl p-4 text-center">
              {previewImage ? (
                <div className="relative group">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <button
                    type="button"
                    onClick={clearImage}
                    className="absolute top-2 right-2 bg-red-500/80 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-purple-600/20 text-purple-400 px-6 py-3 rounded-lg hover:bg-purple-600/30 transition-colors"
                  >
                    Upload Profile Photo
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <input
                {...register("name", { required: true })}
                placeholder="Name"
                className="w-full bg-[#00031b] px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
              {errors.name && (
                <p className="text-red-500">Name is required!</p>
              )}

              <input
                {...register("email", { required: true })}
                type="email"
                placeholder="Email"
                className="w-full bg-[#00031b] px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
              {errors.email && (
                <p className="text-red-500">Email is required!</p>
              )}

              <input
                {...register("contactNumber", { required: true })}
                placeholder="Contact Number"
                className="w-full bg-[#00031b] px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
              {errors.contactNumber && (
                <p className="text-red-500">Contact number is required!</p>
              )}
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <select
                {...register("role", { required: true })}
                className="w-full bg-[#00031b] px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select Role</option>
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
              </select>
              {errors.role && (
                <p className="text-red-500">Role is required!</p>
              )}

              <select
                {...register("status", { required: true })}
                className="w-full bg-[#00031b] px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select Status</option>
                <option value="ACTIVE">Active</option>
                <option value="BLOCKED">Inactive</option>
              </select>
              {errors.status && (
                <p className="text-red-500">Status is required!</p>
              )}
            </div>
          </div>

          {/* Form Buttons */}
          <div className="mt-8 flex justify-end gap-4">
            <button
              type="button"
              onClick={() => {
                setUpdateModalOpen(false);
                reset();
                clearImage();
              }}
              className="px-4 lg:px-6 py-2 text-sm lg:text-base cursor-pointer rounded-lg hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-purple-500 cursor-pointer text-sm lg:text-base px-4 lg:px-6 py-2 rounded-lg transition-colors"
            >
              Update User
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default UpdateUserModal; 