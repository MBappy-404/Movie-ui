import { AnimatePresence, motion } from "framer-motion";
import { useDeleteReviewMutation } from "../redux/features/review/reviewApi";
import { toast } from "sonner";

interface deletePendingReviewModalProps {
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: any;
  reviewToDelete: any | null;
  setReviewToDelete: any;
}

const DeletePendingReviewModal = ({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  reviewToDelete,
  setReviewToDelete,
}: deletePendingReviewModalProps) => {
  const [deleteReview] = useDeleteReviewMutation();

  const handlePendingReviewDelete = async (reviewId: string) => {
    const toastId = toast.loading("Deleting Review....", { duration: 2000 });

    try {
      await deleteReview(reviewId).unwrap();
      toast.success("Review is deleted successfully", { id: toastId });
      setIsDeleteModalOpen(false);
      setReviewToDelete(null);
    } catch (error: any) {
      const errorMessage = error?.data?.message || "Failed to delete review";
      toast.error(errorMessage, { id: toastId });
      console.error("Error deleting review:", error);
    }
  };

  return (
    <div>
      <AnimatePresence>
        {isDeleteModalOpen && reviewToDelete && (
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
                Delete Pending Review
              </h2>
              <p className="text-gray-300 mb-6">
                Are you sure you want to delete the content your pending
                review"? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => {
                    setIsDeleteModalOpen(false);
                    setReviewToDelete(null);
                  }}
                  className="px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handlePendingReviewDelete(reviewToDelete.id)}
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
  );
};

export default DeletePendingReviewModal;
