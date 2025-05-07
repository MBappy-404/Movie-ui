import { useState } from "react";
import { motion } from "framer-motion";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useUpdateReviewMutation } from "@/components/redux/features/review/reviewApi";
import { Review } from "../types/review";

interface UpdateReviewModalProps {
  isUpdateModalOpen: boolean;
  setUpdateModalOpen: (isOpen: boolean) => void;
  review: Review | null;
}

const UpdateReviewModal = ({
  isUpdateModalOpen,
  setUpdateModalOpen,
  review,
}: UpdateReviewModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Review>();

  const [updateReview] = useUpdateReviewMutation();

  const onSubmit: SubmitHandler<Review> = async (data) => {
    const toastId = toast.loading("Updating Review....", { duration: 2000 });

    const reviewData = {
      id: review?.id,
      userId: data.userId,
      contentId: data.contentId,
      reviewText: data.reviewText,
      rating: data.rating,
      spoiler: data.spoiler,
      status: data.status,
      tags: data.tags,
    };

    try {
      const res = await updateReview(reviewData).unwrap();
      toast.success("Review updated successfully!", { id: toastId });
      setUpdateModalOpen(false);
      reset();
    } catch (error: any) {
      toast.error(error.message || "Failed to update review", { id: toastId });
      setUpdateModalOpen(false);
      reset();
    }
  };

  if (!isUpdateModalOpen || !review) return null;

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
            Update Review
          </h2>

          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <input
                {...register("userId", { required: true })}
                defaultValue={review.userId}
                placeholder="User ID"
                className="w-full bg-[#00031b] px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
              {errors.userId && (
                <p className="text-red-500">User ID is required!</p>
              )}

              <input
                {...register("contentId", { required: true })}
                defaultValue={review.contentId}
                placeholder="Content ID"
                className="w-full bg-[#00031b] px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
              {errors.contentId && (
                <p className="text-red-500">Content ID is required!</p>
              )}

              <textarea
                {...register("reviewText", { required: true })}
                defaultValue={review.reviewText}
                placeholder="Review Text"
                className="w-full bg-[#00031b] px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500"
                rows={4}
              />
              {errors.reviewText && (
                <p className="text-red-500">Review text is required!</p>
              )}
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <input
                {...register("rating", { required: true, min: 0, max: 5 })}
                type="number"
                step="0.1"
                defaultValue={review.rating}
                placeholder="Rating (0-5)"
                className="w-full bg-[#00031b] px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
              {errors.rating && (
                <p className="text-red-500">Rating is required!</p>
              )}

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  {...register("spoiler")}
                  defaultChecked={review.spoiler}
                  className="w-4 h-4 rounded focus:ring-purple-500"
                />
                <label className="text-gray-300">Contains Spoiler</label>
              </div>

              <select
                {...register("status", { required: true })}
                defaultValue={review.status}
                className="w-full bg-[#00031b] px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select Status</option>
                <option value="PENDING">Pending</option>
                <option value="APPROVED">Approved</option>
                <option value="REJECTED">Rejected</option>
              </select>
              {errors.status && (
                <p className="text-red-500">Status is required!</p>
              )}

              <select
                {...register("tags", { required: true })}
                defaultValue={review.tags}
                className="w-full bg-[#00031b] px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select Tags</option>
                <option value="CLASSIC">Classic</option>
                <option value="TRENDING">Trending</option>
                <option value="POPULAR">Popular</option>
                <option value="NEW">New</option>
              </select>
              {errors.tags && (
                <p className="text-red-500">Tags is required!</p>
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
              }}
              className="px-6 py-2 cursor-pointer rounded-lg hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-purple-500 cursor-pointer px-6 py-2 rounded-lg transition-colors"
            >
              Update Review
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default UpdateReviewModal; 