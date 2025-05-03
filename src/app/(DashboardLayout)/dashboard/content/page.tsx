"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, SubmitHandler } from "react-hook-form";

interface Movie {
  title: string;
  releaseYear: string;
  duration: string;
  thumbnail: string;
  price: number;
  director: string;
  producer: string;
  actor: string;
  actress: string;
  spoilerWarning: boolean;
  synopsis: string;
  genre: string;
  platform: string;
  isAvailable: boolean;
}

const MovieCMS = () => {
  const { register, handleSubmit, reset, setValue } = useForm<Movie>();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
        setValue("thumbnail", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setPreviewImage(null);
    setValue("thumbnail", "");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onSubmit: SubmitHandler<Movie> = (data) => {
    const newMovie = {
      ...data,
      price: Number(data.price),
    };
    setMovies([...movies, newMovie]);
    setIsModalOpen(false);
    reset();
    clearImage();
  };

  return (
    <div className="min-h-screen bg-[#00031b] p-2">
      <div className="max-w-full mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold  bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Movie CMS
          </h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className=" cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-lg transition-all"
          >
            Add Content
          </button>
        </div>

        {/* Movie Table */}
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
                </tr>
              </thead>
              <tbody>
                {movies.map((movie, index) => (
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
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

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
                    Add New Movie
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
                      <input
                        {...register("director", { required: true })}
                        placeholder="Director"
                        className="w-full bg-[#00031b] px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500"
                      />
                      <input
                        {...register("producer", { required: true })}
                        placeholder="Producer"
                        className="w-full bg-[#00031b] px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500"
                      />
                      <input
                        {...register("actor", { required: true })}
                        placeholder="Actor"
                        className="w-full bg-[#00031b] px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500"
                      />
                      <input
                        {...register("actress", { required: true })}
                        placeholder="Actress"
                        className="w-full bg-[#00031b] px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                      <input
                        {...register("releaseYear", { required: true })}
                        placeholder="Release Year"
                        className="w-full bg-[#00031b] px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500"
                      />
                      <input
                        {...register("duration", { required: true })}
                        placeholder="Duration"
                        className="w-full bg-[#00031b] px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500"
                      />
                      <input
                        type="number"
                        {...register("price", {
                          required: true,
                          valueAsNumber: true,
                        })}
                        placeholder="Price"
                        className="w-full bg-[#00031b] px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500"
                      />
                      <select
                        {...register("genre", { required: true })}
                        className="w-full bg-[#00031b] px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="">Select Genre</option>
                        <option value="Action">Action</option>
                        <option value="Drama">Drama</option>
                        <option value="Comedy">Comedy</option>
                      </select>
                      <select
                        {...register("platform", { required: true })}
                        className="w-full bg-[#00031b] px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="">Select Platform</option>
                        <option value="Netflix">Netflix</option>
                        <option value="Amazon Prime">Amazon Prime</option>
                        <option value="Disney+">Disney+</option>
                      </select>
                    </div>
                  </div>

                  {/* Bottom Section */}
                  <div className="mt-6 space-y-4">
                    <textarea
                      {...register("synopsis", { required: true })}
                      placeholder="Synopsis"
                      className="w-full bg-[#00031b] px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 h-32"
                    />
                    <div className="flex gap-6">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          {...register("spoilerWarning")}
                          className="w-5 h-5 text-purple-500 rounded focus:ring-purple-500"
                        />
                        <span className="text-gray-400">Spoiler Warning</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          {...register("isAvailable")}
                          className="w-5 h-5 text-purple-500 rounded focus:ring-purple-500"
                        />
                        <span className="text-gray-400">Available</span>
                      </label>
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
                      Add Movie
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MovieCMS;
