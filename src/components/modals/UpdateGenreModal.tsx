"use client";
import { Genre } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useUpdateGenreMutation } from "../redux/features/genre/genreApi";

interface UpdateGenreModalProps {
  isUpdateGenreModalOpen: boolean;
  setUpdateGenreModalOpen: (isOpen: boolean) => void;
  genre: any;
}

const UpdateGenreModal = ({
  isUpdateGenreModalOpen,
  setUpdateGenreModalOpen,
  genre,
}: UpdateGenreModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Genre>();
  const [updateGenre] = useUpdateGenreMutation();

  const onSubmit: SubmitHandler<Genre> = async (data) => {
    //console.log(data);
    const toastId = toast.loading("Updating Genre....", { duration: 2000 });

    const genreData = {
      data,
      genreIdId: genre.id,
    };

    // updating genre
    try {
      const res = await updateGenre(genreData);
      //console.log(res);
      if ("error" in res && res.error) {
        const errorMessage =
          (res.error as any)?.data?.message || "An error occurred";
        toast.error(errorMessage, { id: toastId });
        setUpdateGenreModalOpen(false);
        reset();
      } else {
        toast.success(res?.data?.message, { id: toastId });
        setUpdateGenreModalOpen(false);
        reset();
      }
    } catch (error: any) {
      toast.error(error.data.message, { id: toastId, duration: 2000 });
      setUpdateGenreModalOpen(false);
      reset();
    }
  };

  return (
    <div>
      <AnimatePresence>
        {isUpdateGenreModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-lg z-50"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-fit bg-[#000a3a] border border-[#1a2d6d] rounded-xl overflow-hidden"
            >
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="p-8 max-h-[90vh] overflow-y-auto"
              >
                <h2 className="lg:text-2xl font-bold mb-6 text-xl bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                  Update Genre
                </h2>

                {/* Form Grid */}
                <div className="">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <input
                      defaultValue={genre.genreName}
                      {...register("genreName")}
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
                      setUpdateGenreModalOpen(false);
                      reset();
                    }}
                    className="px-6 py-2 cursor-pointer text-sm lg:text-base rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className=" bg-gradient-to-r from-blue-500 to-purple-500  cursor-pointer text-sm px-4 lg:text-base lg:px-6 lg:py-2 rounded-lg transition-colors"
                  >
                    Update Genre
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

export default UpdateGenreModal;
