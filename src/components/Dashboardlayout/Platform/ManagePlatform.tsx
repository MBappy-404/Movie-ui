"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  useCreatePlatformMutation,
  useDeletePlatformMutation,
  useGetAllPlatformQuery,
} from "@/components/redux/features/platform/platformApi";
import { toast } from "sonner";
import { MdDeleteOutline } from "react-icons/md";
import { FaPen } from "react-icons/fa6";
import { useRef, useState } from "react";
import Image from "next/image";
import LoadingSpinner from "@/components/ui/loading-spinner";
import UpdataPlatformModal from "@/components/modals/UpdatePlatformModal";

interface Platform {
  id: string;
  platformName: string;
  platformLogo: string | undefined;
}

const ManagePlatform = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Platform>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isUpdatePlatformModalOpen, setUpdatePlatformModalOpen] =
    useState(false);
  const [platform, setPlatform] = useState<{} | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [platformToDelete, setPlatformToDelete] = useState<Platform | null>(
    null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data: platforms, isLoading } = useGetAllPlatformQuery(undefined);
  const [addPlatform, { data, error }] = useCreatePlatformMutation();
  const [deletePlatform] = useDeletePlatformMutation();

  const platformsData = platforms?.data;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setThumbnail(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
        // setValue("thumbnail", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setPreviewImage(null);
    setValue("platformLogo", "");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onSubmit: SubmitHandler<Platform> = async (data) => {
    const toastId = toast.loading("Adding Platform....", { duration: 2000 });

    if (!thumbnail) {
      toast.error("Please provide a picture", {
        id: toastId,
      });
      return;
    }

    const newPlatform = {
      platformName: data.platformName,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(newPlatform));
    formData.append("file", thumbnail);

    // uploading platform
    try {
      const res = await addPlatform(formData);
      //console.log(res);
      if ("error" in res && res.error) {
        const errorMessage =
          (res.error as any)?.data?.message || "An error occurred";
        toast.error(errorMessage, { id: toastId });
        setIsModalOpen(false);
        reset();
        clearImage();
      } else {
        toast.success(res?.data?.message, { id: toastId });
        setIsModalOpen(false);
        reset();
        clearImage();
      }
    } catch (error: any) {
      toast.error(error.data.message, { id: toastId, duration: 2000 });
      setIsModalOpen(false);
      reset();
      clearImage();
    }
  };

  const handlePlatformDelete = async (platformId: string) => {
    const toastId = toast.loading("Deleting Platform...", { duration: 2000 });

    try {
      const res = await deletePlatform(platformId);
      //console.log(res);
      if ("error" in res && res.error) {
        const errorMessage =
          (res.error as any)?.data?.message || "An error occurred";
        toast.error(errorMessage, { id: toastId });
      } else {
        toast.success(res?.data?.message, { id: toastId });
      }
      setIsDeleteModalOpen(false);
      setPlatformToDelete(null);
    } catch (error: any) {
      toast.error(error.data.message, { id: toastId, duration: 2000 });
    }
  };

  return (
    <div className="bg-[#00031b] p-2">
      <div className="max-w-full mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold  bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Platform Management
          </h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className=" cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-lg transition-all"
          >
            Add Platform
          </button>
        </div>

        {/* Movie Table */}
        {isLoading ? (
          <p className="text-white text-5xl font-bold text-center">
            <LoadingSpinner />
          </p>
        ) : (
          <div className="rounded-xl border border-[#1a2d6d] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#000a3a]">
                  <tr>
                    <th className="px-6 py-4 text-left">Platform Name</th>
                    <th className="px-6 py-4 text-left">Platform Logo</th>
                    <th className="px-6 py-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {platformsData?.map((platform: Platform, index: number) => (
                    <motion.tr
                      key={index + 1}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border-t border-[#1a2d6d] hover:bg-[#000a3a]/50 transition-colors"
                    >
                      <td className="px-6 py-4">{platform.platformName}</td>
                      <td className="px-6 py-4">
                        <Image
                          src={platform.platformLogo!}
                          alt="Platform Logo"
                          height={500}
                          width={500}
                          className="h-14 w-14 rounded-full"
                        />
                      </td>
                      <td className="px-6 py-4 text-2xl flex gap-3">
                        <MdDeleteOutline
                          onClick={() => {
                            setPlatformToDelete(platform);
                            setIsDeleteModalOpen(true);
                          }}
                          className="cursor-pointer hover:text-red-500 transition-colors"
                        />
                        <FaPen
                          className="text-xl cursor-pointer hover:text-blue-500 transition-colors"
                          onClick={() => {
                            setUpdatePlatformModalOpen(true);
                            setPlatform(platform);
                          }}
                        />
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Add Movie Modal */}
        <AnimatePresence>
          {isModalOpen && (
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
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="p-8 max-h-[90vh] overflow-y-auto"
                >
                  <h2 className="text-2xl font-bold mb-6  bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                    Add New Platform
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
                            Upload Image
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
                        {...register("platformName", { required: true })}
                        placeholder="Platform Name"
                        className="w-full bg-[#00031b] px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500"
                      />
                      {errors.platformName && (
                        <p className="text-red-500">
                          Platform Name is required!
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Form Buttons */}
                  <div className="mt-8 flex justify-end gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        setIsModalOpen(false);
                        reset();
                        clearImage();
                      }}
                      className="px-6 py-2 cursor-pointer rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className=" bg-gradient-to-r from-blue-500 to-purple-500  cursor-pointer px-6 py-2 rounded-lg transition-colors"
                    >
                      Add Platform
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Update Platform */}
        <UpdataPlatformModal
          platform={platform as Platform | null}
          isUpdatePlatformModalOpen={isUpdatePlatformModalOpen}
          setUpdatePlatformModalOpen={setUpdatePlatformModalOpen}
        />

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {isDeleteModalOpen && platformToDelete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-lg z-50"
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-[#000a3a] border border-[#1a2d6d] rounded-xl overflow-hidden p-6"
              >
                <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                  Delete Platform
                </h2>
                <p className="text-gray-300 mb-6">
                  Are you sure you want to delete the platform "
                  {platformToDelete.platformName}"? This action cannot be
                  undone.
                </p>
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => {
                      setIsDeleteModalOpen(false);
                      setPlatformToDelete(null);
                    }}
                    className="px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handlePlatformDelete(platformToDelete.id)}
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ManagePlatform;
