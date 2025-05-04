"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, SubmitHandler } from "react-hook-form";
import { useGetAllGenresQuery } from "@/components/redux/features/genre/genreApi";
import { useGetAllPlatformQuery } from "@/components/redux/features/platform/platformApi";
import { toast } from "sonner";
import {
  useCreateContentMutation,
  useDeleteContentMutation,
  useGetAllContentQuery,
} from "@/components/redux/features/content/contentApi";
import { MdDeleteOutline } from "react-icons/md";
import { FaPen } from "react-icons/fa6";
import { TGenre, TGenresOptions } from "@/components/types/genre";
import { TPlatform, TPlatformsOptions } from "@/components/types/platform";
import UpdateModal, { Content } from "@/components/modals/UpdateContentModal";
import LoadingSpinner from "@/components/ui/loading-spinner";

export interface Movie {
  id: string;
  title: string;
  releaseYear: string;
  duration: string;
  thumbnail: string;
  price: number;
  rentprice: number;
  director: string;
  producer: string;
  actor: string;
  actress: string;
  spoilerWarning: boolean;
  synopsis: string;
  genreId: string;
  platformId: string;
  isAvailable: boolean;
  contentLink: string;
  contentBanner: string;
}

const ManageContent = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Movie>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [content, setContent] = useState<{} | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [contentToDelete, setContentToDelete] = useState<Movie | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data: genres } = useGetAllGenresQuery(undefined);
  const { data: platforms } = useGetAllPlatformQuery(undefined);
  const { data: contents, isLoading } = useGetAllContentQuery(undefined);
  const [addContent, { data, error }] = useCreateContentMutation();
  const [deleteContent] = useDeleteContentMutation();

  const movies = contents?.data;

  const genresOptions = genres?.data?.map((item: TGenre) => ({
    genreId: item.id,
    label: item.genreName,
  }));

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
    setValue("thumbnail", "");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onSubmit: SubmitHandler<Movie> = async (data) => {
    //console.log(data);
    const toastId = toast.loading("Adding Content....", { duration: 2000 });

    if (!thumbnail) {
      toast.error("Please provide a picture", {
        id: toastId,
      });
      return;
    }

    const newMovie = {
      content: {
        ...data,
        price: data.price,
        rentprice: data.rentprice,
        isAvailable: data.isAvailable || false,
      },
      contentLink: data.contentLink,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(newMovie));
    formData.append("file", thumbnail);

    // uploading movie
    try {
      const res = await addContent(formData);
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

  const handleContentDelete = async (contentId: string) => {
    const toastId = toast.loading("Deleting Content...", { duration: 2000 });

    try {
      const res = await deleteContent(contentId);
      //console.log(res);
      if ("error" in res && res.error) {
        const errorMessage =
          (res.error as any)?.data?.message || "An error occurred";
        toast.error(errorMessage, { id: toastId });
      } else {
        toast.success(res?.data?.message, { id: toastId });
      }
      setIsDeleteModalOpen(false);
      setContentToDelete(null);
    } catch (error: any) {
      toast.error(error.data.message, { id: toastId, duration: 2000 });
    }
  };

  return (
    <div className="min-h-screen bg-[#00031b] p-2">
      <div className="max-w-full mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold  bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Content Management
          </h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className=" cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-lg transition-all"
          >
            Add Content
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
                    <th className="px-6 py-4 text-left">Title</th>
                    <th className="px-6 py-4 text-left">Director</th>
                    <th className="px-6 py-4 text-left">Year</th>
                    <th className="px-6 py-4 text-left">Price</th>
                    <th className="px-6 py-4 text-left">Status</th>
                    <th className="px-6 py-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {movies?.map((movie: Movie, index: number) => (
                    <motion.tr
                      key={index + 1}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border-t border-[#1a2d6d] hover:bg-[#000a3a]/50 transition-colors"
                    >
                      <td className="px-6 py-4">{movie.title}</td>
                      <td className="px-6 py-4">{movie.director}</td>
                      <td className="px-6 py-4">{movie.releaseYear}</td>
                      <td className="px-6 py-4">${movie.price}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-sm ${
                            movie.isAvailable
                              ? "bg-green-500/20 text-green-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {movie.isAvailable ? "Available" : "Unavailable"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-2xl flex gap-3">
                        <MdDeleteOutline
                          onClick={() => {
                            setContentToDelete(movie);
                            setIsDeleteModalOpen(true);
                          }}
                        />
                        <FaPen
                          className="text-xl"
                          onClick={() => {
                            setUpdateModalOpen(true);
                            setContent(movie);
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
                    Add New Content
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
                        placeholder="Title"
                        className="w-full bg-[#00031b] px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500"
                      />
                      {errors.title && (
                        <p className="text-red-500">Title is required!</p>
                      )}

                      <input
                        {...register("director", { required: true })}
                        placeholder="Director"
                        className="w-full bg-[#00031b] px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500"
                      />
                      {errors.director && (
                        <p className="text-red-500">Director is required!</p>
                      )}

                      <input
                        {...register("producer", { required: true })}
                        placeholder="Producer"
                        className="w-full bg-[#00031b] px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500"
                      />
                      {errors.producer && (
                        <p className="text-red-500">Producer is required!</p>
                      )}

                      <input
                        {...register("actor", { required: true })}
                        placeholder="Actor"
                        className="w-full bg-[#00031b] px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500"
                      />
                      {errors.actor && (
                        <p className="text-red-500">Actor is required!</p>
                      )}

                      <input
                        {...register("actress", { required: true })}
                        placeholder="Actress"
                        className="w-full bg-[#00031b] px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500"
                      />
                      {errors.actress && (
                        <p className="text-red-500">Actress is required!</p>
                      )}

                      <input
                        {...register("contentLink", { required: true })}
                        placeholder="contentLink"
                        className="w-full bg-[#00031b] px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500"
                      />
                      {errors.contentLink && (
                        <p className="text-red-500">ContentLink is required!</p>
                      )}
                      <input
                        {...register("contentBanner", { required: true })}
                        placeholder="contentBanner"
                        className="w-full bg-[#00031b] px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500"
                      />
                      {errors.contentLink && (
                        <p className="text-red-500">
                          Content Banner is required!
                        </p>
                      )}
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                      <input
                        {...register("releaseYear", { required: true })}
                        placeholder="Release Year"
                        className="w-full bg-[#00031b] px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500"
                      />
                      {errors.releaseYear && (
                        <p className="text-red-500">ReleaseYear is required!</p>
                      )}

                      <input
                        {...register("duration", { required: true })}
                        placeholder="Duration"
                        className="w-full bg-[#00031b] px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500"
                      />
                      {errors.duration && (
                        <p className="text-red-500">Duration is required!</p>
                      )}

                      <input
                        type="number"
                        step="any"
                        {...register("price", {
                          required: true,
                          valueAsNumber: true,
                        })}
                        placeholder="Price"
                        className="w-full bg-[#00031b] px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500"
                      />
                      {errors.price && (
                        <p className="text-red-500">Price is required!</p>
                      )}

                      <input
                        type="number"
                        step="any"
                        {...register("rentprice", {
                          required: true,
                          valueAsNumber: true,
                        })}
                        placeholder="Rent Price"
                        className="w-full bg-[#00031b] px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500"
                      />
                      {errors.rentprice && (
                        <p className="text-red-500">Rent price is required!</p>
                      )}

                      {/* Genre select input */}
                      <select
                        id="genreId"
                        {...register("genreId", { required: true })}
                        className="w-full bg-[#00031b] px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="">Select Genre</option>
                        {genresOptions?.map((genre: TGenresOptions) => (
                          <option key={genre.genreId} value={genre.genreId}>
                            {genre.label}
                          </option>
                        ))}
                      </select>
                      {errors.genreId && (
                        <p className="text-red-500">Genre is required!</p>
                      )}

                      {/* Platform select input */}
                      <select
                        id="platformId"
                        {...register("platformId", { required: true })}
                        className="w-full bg-[#00031b] px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="">Select Platform</option>
                        {platformsOptions?.map(
                          (platform: TPlatformsOptions) => (
                            <option
                              key={platform.platformId}
                              value={platform.platformId}
                            >
                              {platform.label}
                            </option>
                          )
                        )}
                      </select>
                      {errors.platformId && (
                        <p className="text-red-500">Platform is required!</p>
                      )}
                    </div>
                  </div>

                  {/* Bottom Section */}
                  <div className="mt-6 space-y-4">
                    <textarea
                      {...register("synopsis", { required: true })}
                      placeholder="Synopsis"
                      className="w-full bg-[#00031b] px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 h-32"
                    />
                    {errors.synopsis && (
                      <p className="text-red-500">Synopsis is required!</p>
                    )}
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
                      Add Content
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Update Movie Modal */}
        <UpdateModal
          isUpdateModalOpen={isUpdateModalOpen}
          setUpdateModalOpen={setUpdateModalOpen}
          content={content as Content | null}
        />

        {/* Delete Content Modal */}
        <AnimatePresence>
          {isDeleteModalOpen && contentToDelete && (
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
                  Delete Content
                </h2>
                <p className="text-gray-300 mb-6">
                  Are you sure you want to delete the content "
                  {contentToDelete.title}"? This action cannot be undone.
                </p>
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => {
                      setIsDeleteModalOpen(false);
                      setContentToDelete(null);
                    }}
                    className="px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleContentDelete(contentToDelete.id)}
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

export default ManageContent;
