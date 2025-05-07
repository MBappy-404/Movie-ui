"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, SubmitHandler } from "react-hook-form";
import { useGetAllGenresQuery } from "@/components/redux/features/genre/genreApi";
import { useGetAllPlatformQuery } from "@/components/redux/features/platform/platformApi";
import { toast } from "sonner";
import { useUpdateContentMutation } from "@/components/redux/features/content/contentApi";
import { TGenre, TGenresOptions } from "@/components/types/genre";
import { TPlatform, TPlatformsOptions } from "@/components/types/platform";
import { useEffect, useRef, useState } from "react";

export interface Content {
  id: string;
  title: string;
  description: string;
  isAvailable: string;
  price: number;
  releaseYear: string;
  synopsis: string;
  director: string;
  duration: string;
  producer: string;
  spoilerWarning: string
  actor: string;
  actress: string;
  rentprice: string;
  contentLink: string;
  genreId: string;
  platformId: string;
  contentBanner: string;
}

interface UpdateContentModalProps {
  isUpdateModalOpen: boolean;
  setUpdateModalOpen: (isOpen: boolean) => void;
  content: Content | null;
}

const UpdateContentModal = ({
  isUpdateModalOpen,
  setUpdateModalOpen,
  content,
}: UpdateContentModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Content>();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data: genres } = useGetAllGenresQuery(undefined);
  const { data: platforms } = useGetAllPlatformQuery(undefined);
  const [updateContent] = useUpdateContentMutation();

  //console.log(content);

  const genresOptions = genres?.data?.map((item: TGenre) => ({
    genreId: item.id,
    label: item.genreName,
  }));

  const setAvailabilityOptions = [
    { id: 1, value: true, label: "Available" },
    { id: 2, value: false, label: "Not Available" },
  ];

  const platformsOptions = platforms?.data?.map((item: TPlatform) => ({
    platformId: item.id,
    label: item.platformName,
    platformLogo: item.platformLogo,
  }));

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
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onSubmit: SubmitHandler<Content> = async (data) => {
    //console.log(data);
    const toastId = toast.loading("Updating Content....", { duration: 2000 });

    const formData = new FormData();

    if (thumbnail) {
      formData.append("file", thumbnail);
    }

    const updateMovie = {
      content: {
        ...data,
        price: data.price,
        rentprice: data.rentprice,
        isAvailable: data.isAvailable === "true" ? true : false,
      },
      contentLink: data.contentLink,
    };

    //console.log(updateMovie);

    formData.append("data", JSON.stringify(updateMovie));

    // updating movie
    try {
      const res = await updateContent({ formData, contentId: content?.id });
      //console.log(res);
      if ("error" in res && res.error) {
        const errorMessage =
          (res.error as any)?.data?.message || "An error occurred";
        toast.error(errorMessage, { id: toastId });
        setUpdateModalOpen(false);
        reset();
        clearImage();
      } else {
        toast.success(res?.data?.message, { id: toastId });
        setUpdateModalOpen(false);
        reset();
        clearImage();
      }
    } catch (error: any) {
      toast.error(error.data.message, { id: toastId, duration: 2000 });
      setUpdateModalOpen(false);
      reset();
      clearImage();
    }
  };

  useEffect(() => {
    if (content) {
      reset({
        title: content.title || "",
        price: content.price || 0,
        releaseYear: content.releaseYear || "",
        synopsis: content.synopsis || "",
        director: content.director || "",
        duration: content.duration || "",
        producer: content.producer || "",
        actor: content.actor || "",
        actress: content.actress || "",
        rentprice: content.rentprice || "",
        genreId: content.genreId || "",
        platformId: content.platformId || "",
        isAvailable: content.isAvailable,
        contentBanner: content.contentBanner || "",
        contentLink: content.id || "",
      });
    }
  }, [content, reset]);

  return (
    <div>
      <AnimatePresence>
        {isUpdateModalOpen && (
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
                  Update Movie
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
                      {...register("title", { required: true })}
                      defaultValue={content?.title}
                      placeholder="Title"
                      className="w-full bg-[#00031b] px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                    {errors.title && (
                      <p className="text-red-500">Title is required!</p>
                    )}

                    <input
                      {...register("director")}
                      placeholder="Director"
                      className="w-full bg-[#00031b] px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />

                    <input
                      {...register("producer")}
                      placeholder="Producer"
                      className="w-full bg-[#00031b] px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />

                    <input
                      {...register("actor")}
                      placeholder="Actor"
                      className="w-full bg-[#00031b] px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />

                    <input
                      {...register("actress")}
                      placeholder="Actress"
                      className="w-full bg-[#00031b] px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />

                    <input
                      {...register("contentLink")}
                      placeholder="contentLink"
                      className="w-full bg-[#00031b] px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />

                    <input
                      {...register("contentBanner")}
                      placeholder="contentBanner"
                      className="w-full bg-[#00031b] px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <input
                      {...register("releaseYear")}
                      placeholder="Release Year"
                      className="w-full bg-[#00031b] px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />

                    <input
                      {...register("duration")}
                      placeholder="Duration"
                      className="w-full bg-[#00031b] px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />

                    <input
                      type="number"
                      step="any"
                      {...register("price", {
                        valueAsNumber: true,
                      })}
                      placeholder="Price"
                      className="w-full bg-[#00031b] px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />

                    <input
                      type="number"
                      step="any"
                      {...register("rentprice", {
                        valueAsNumber: true,
                      })}
                      placeholder="Rent Price"
                      className="w-full bg-[#00031b] px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />

                    {/* Genre select input */}
                    <select
                      id="genreId"
                      {...register("genreId")}
                      className="w-full bg-[#00031b] px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">Select Genre</option>
                      {genresOptions?.map((genre: TGenresOptions) => (
                        <option key={genre.genreId} value={genre.genreId}>
                          {genre.label}
                        </option>
                      ))}
                    </select>

                    {/* Platform select input */}
                    <select
                      id="platformId"
                      {...register("platformId")}
                      className="w-full bg-[#00031b] px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">Select Platform</option>
                      {platformsOptions?.map((platform: TPlatformsOptions) => (
                        <option
                          key={platform.platformId}
                          value={platform.platformId}
                        >
                          {platform.label}
                        </option>
                      ))}
                    </select>

                    {/* set content availability */}
                    <select
                      id="isAvailable"
                      {...register("isAvailable", {})}
                      className="w-full bg-[#00031b] px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">Set Availability</option>
                      {setAvailabilityOptions?.map((available: any) => (
                        <option key={available.id} value={available.value}>
                          {available.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-6 space-y-4">
                  <textarea
                    {...register("synopsis")}
                    placeholder="Synopsis"
                    className="w-full bg-[#00031b] px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 h-32"
                  />
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
                    className="px-6 py-2 cursor-pointer rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className=" bg-gradient-to-r from-blue-500 to-purple-500  cursor-pointer px-6 py-2 rounded-lg transition-colors"
                  >
                    Update Movie
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

export default UpdateContentModal;
