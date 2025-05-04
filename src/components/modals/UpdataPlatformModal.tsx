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
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Image from "next/image";

interface Platform {
  id: string;
  platformName: string;
  platformLogo: string | undefined;
}

type TUpdatePlatformModal = {
  isUpdatePlatformModalOpen: boolean;
  setUpdatePlatformModalOpen: Dispatch<SetStateAction<boolean>>;
  platform: any;
};

const UpdataPlatformModal = ({
  platform,
  isUpdatePlatformModalOpen,
  setUpdatePlatformModalOpen,
}: TUpdatePlatformModal) => {
  const { register, handleSubmit, reset, setValue } = useForm<Platform>();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  console.log(platform);

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
    console.log(data);
    //   const toastId = toast.loading("Updating Content....", { duration: 2000 });

    //   const formData = new FormData();

    //   if (thumbnail) {
    //     formData.append("file", thumbnail);
    //   }

    //   const updateMovie = {
    //     content: {
    //       ...data,
    //       price: data.price,
    //       rentprice: data.rentprice,
    //     },
    //     contentLink: data.contentLink,
    //   };

    //   formData.append("data", JSON.stringify(updateMovie));

    //   // updating movie
    //   try {
    //     const res = await updateContent({ formData, contentId: content.id });
    //     console.log(res);
    //     if ("error" in res && res.error) {
    //       const errorMessage =
    //         (res.error as any)?.data?.message || "An error occurred";
    //       toast.error(errorMessage, { id: toastId });
    //       setUpdateModalOpen(false);
    //       reset();
    //       clearImage();
    //     } else {
    //       toast.success(res?.data?.message, { id: toastId });
    //       setUpdateModalOpen(false);
    //       reset();
    //       clearImage();
    //     }
    //   } catch (error: any) {
    //     toast.error(error.data.message, { id: toastId, duration: 2000 });
    //     setUpdateModalOpen(false);
    //     reset();
    //     clearImage();
    //   }
    // };

    // useEffect(() => {
    //   if (content) {
    //     reset({
    //       title: content?.title || "",
    //       price: Number(content?.price || ""),
    //       releaseYear: content?.releaseYear || "",
    //       synopsis: content?.synopsis || "",
    //       director: content?.director || "",
    //       duration: content?.duration || "",
    //       producer: content?.producer || "",
    //       actor: content?.actor || "",
    //       actress: content?.actress || "",
    //       rentprice: content?.rentprice || "",
    //       contentLink: content?.ContentLinks?.contentLink || "",
    //       genreId: content?.genre?.id || "",
    //       platformId: content?.platform?.id || "",
    //     });
    //   }
    // }, [content, reset]);

    return (
      <div>
        <AnimatePresence>
          {isUpdatePlatformModalOpen && (
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
                        {...register("platformName")}
                        placeholder="Platform Name"
                        className="w-full bg-[#00031b] px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>

                  {/* Form Buttons */}
                  <div className="mt-8 flex justify-end gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        setUpdatePlatformModalOpen(false);
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
      </div>
    );
  };
};

export default UpdataPlatformModal;
