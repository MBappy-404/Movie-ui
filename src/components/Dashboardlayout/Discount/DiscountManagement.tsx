"use client";

import {
  useDeleteDiscountMutation,
  useGetAllDiscountsQuery,
} from "@/components/redux/features/discount/discountApi";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdDeleteOutline } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { toast } from "sonner";
import { IDiscount } from "@/components/types/discount";
import UpdateDiscountModal from "@/components/modals/UpdateDiscountModal";

const DiscountManagement = () => {
  const { data: discounts, isLoading } = useGetAllDiscountsQuery(undefined);
  const [deleteDiscount] = useDeleteDiscountMutation();
  const discountData = discounts?.data;
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [discount, setDiscount] = useState<any | null>(null);
  const [isUpdateDiscountModalOpen, setUpdateDiscountModalOpen] =
    useState(false);
  const [discountToDelete, setDiscountToDelete] = useState<IDiscount | null>(
    null
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const handleDelete = async (discount: IDiscount) => {
    try {
      await deleteDiscount(discount.id).unwrap();
      toast.success(`Discount deleted successfully`);
      setIsDeleteModalOpen(false);
      setDiscountToDelete(null);
    } catch (error: any) {
      const errorMessage = error?.data?.message || "Failed to delete discount";
      toast.error(errorMessage);
      console.error("Error deleting discount:", error);
    }
  };

  const openDeleteModal = (discount: IDiscount) => {
    setDiscountToDelete(discount);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDiscountToDelete(null);
  };

  return (
    <div className="min-h-screen bg-[#00031b]">
      <div className="max-w-full mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <h1 className=" lg:text-3xl text-xl  font-bold  bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Discount Management
          </h1>
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
                    <th className="px-6 py-4 text-left text-sm md:text-base">
                      Content Title
                    </th>
                    <th className="px-6 py-4 text-left text-sm md:text-base">
                      Start Data
                    </th>
                    <th className="px-6 py-4 text-left text-sm md:text-base">
                      End Date
                    </th>
                    <th className="pl-6 py-4 text-left text-sm md:text-base">
                      Discount Percentage
                    </th>
                    <th className="px-6 py-4 text-left text-sm md:text-base">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm md:text-base">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {discountData?.map((discount: IDiscount, index: number) => (
                    <motion.tr
                      key={index + 1}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border-t border-[#1a2d6d] hover:bg-[#000a3a]/50 transition-colors"
                    >
                      <td className="px-6 py-4">{discount?.content?.title}</td>
                      <td className="px-6 py-4">
                        {formatDate(discount?.startDate)}
                      </td>
                      <td className="px-6 py-4">
                        {formatDate(discount?.endDate)}
                      </td>
                      <td className="px-6 py-4 ">{discount?.percentage}%</td>
                      <td className="px-6 py-4 ">
                        <span
                          className={`px-2 py-1 rounded-full text-sm border ${
                            discount.isActive
                              ? "border-green-500/20 text-green-400"
                              : "border-red-500/20 text-red-400"
                          }`}
                        >
                          {discount.isActive ? "ACTIVE" : "DEACTIVE"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-2xl flex gap-3">
                        <MdDeleteOutline
                          className="cursor-pointer hover:text-red-500 transition-colors"
                          onClick={() => openDeleteModal(discount)}
                        />
                        <FaPen
                          className="cursor-pointer hover:text-blue-500 text-xl transition-colors"
                          onClick={() => {
                            setUpdateDiscountModalOpen(true);
                            setDiscount(discount);
                          }}
                        />
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {/* <div className="flex justify-center items-center gap-2 py-4 bg-[#000a3a]">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="lg:px-4 px-3 py-2 text-sm lg:text-base rounded-lg bg-[#1a2d6d] text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-4  py-2 text-sm lg:text-base  rounded-lg ${
                      currentPage === page
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                        : "bg-[#1a2d6d] text-white"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="lg:px-4 px-3 py-2 text-sm lg:text-base rounded-lg bg-[#1a2d6d] text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div> */}
          </div>
        )}

        {/* Update Genre Modal */}
        <UpdateDiscountModal
          isUpdateModalOpen={isUpdateDiscountModalOpen}
          setIsUpdateModalOpen={setUpdateDiscountModalOpen}
          discount={discount}
        />

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {isDeleteModalOpen && discountToDelete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="bg-[#000a3a] p-6 rounded-xl border border-[#1a2d6d] max-w-md w-full mx-4"
              >
                <motion.h3
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-xl font-semibold text-white mb-4"
                >
                  Confirm Delete
                </motion.h3>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-gray-300 mb-6"
                >
                  Are you sure you want to delete this discount? This action
                  cannot be undone.
                </motion.p>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex justify-end gap-4"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={closeDeleteModal}
                    className="px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDelete(discountToDelete)}
                    className="hover:bg-red-600 px-4 py-2 rounded-lg transition-colors cursor-pointer"
                  >
                    Delete
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DiscountManagement;
