import { useState } from "react";
import { motion } from "framer-motion";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useUpdatePlatformMutation } from "@/components/redux/features/platform/platformApi";

interface Platform {
  id: string;
  name: string;
  description: string;
  logo: string;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
  updatedAt: string;
}

interface UpdatePlatformModalProps {
  isUpdatePlatformModalOpen: boolean;
  setUpdatePlatformModalOpen: (isOpen: boolean) => void;
  platform: Platform | null;
}

const UpdatePlatformModal = ({
  isUpdatePlatformModalOpen,
  setUpdatePlatformModalOpen,
  platform,
}: UpdatePlatformModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Platform>();

  const [updatePlatform] = useUpdatePlatformMutation();

  const onSubmit: SubmitHandler<Platform> = async (data) => {
    const toastId = toast.loading("Updating Platform....", { duration: 2000 });

    const platformData = {
      id: platform?.id,
      name: data.name,
      description: data.description,
      status: data.status,
    };

    try {
      const res = await updatePlatform(platformData).unwrap();
      toast.success("Platform updated successfully!", { id: toastId });
      setUpdatePlatformModalOpen(false);
      reset();
    } catch (error: any) {
      toast.error(error.message || "Failed to update platform", { id: toastId });
      setUpdatePlatformModalOpen(false);
      reset();
    }
  };

  if (!isUpdatePlatformModalOpen || !platform) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-lg z-50"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl bg-[#000a3a] border border-[#1a2d6d] rounded-xl overflow-hidden"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="p-8 max-h-[90vh] overflow-y-auto">
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Update Platform
          </h2>

          {/* Form Grid */}
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-4">
              <input
                {...register("name", { required: true })}
                defaultValue={platform.name}
                placeholder="Platform Name"
                className="w-full bg-[#00031b] px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
              {errors.name && (
                <p className="text-red-500">Platform name is required!</p>
              )}

              <textarea
                {...register("description", { required: true })}
                defaultValue={platform.description}
                placeholder="Description"
                className="w-full bg-[#00031b] px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500"
                rows={4}
              />
              {errors.description && (
                <p className="text-red-500">Description is required!</p>
              )}

              <select
                {...register("status", { required: true })}
                defaultValue={platform.status}
                className="w-full bg-[#00031b] px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select Status</option>
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
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
                setUpdatePlatformModalOpen(false);
                reset();
              }}
              className="px-6 py-2 cursor-pointer rounded-lg hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-purple-500 cursor-pointer px-6 py-2 rounded-lg transition-colors"
            >
              Update Platform
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default UpdatePlatformModal; 