"use client";

import { useGetAllDiscountsQuery } from "@/components/redux/features/discount/discountApi";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdDeleteOutline } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import LoadingSpinner from "@/components/LoadingSpinner";

const DiscountManagement = () => {
  const { data: discounts, isLoading } = useGetAllDiscountsQuery(undefined);
  const discountData = discounts?.data;

  return (
    <div className="min-h-screen bg-[#00031b] p-2">
      <div className="max-w-full mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <h1 className=" lg:text-3xl text-2xl  font-bold  bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
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
                    <th className="px-6 py-4 text-left">Content Title</th>
                    <th className="px-6 py-4 text-left">Start Data</th>
                    <th className="px-6 py-4 text-left">End Date</th>
                    <th className="px-6 py-4 text-left">Discount Amount</th>
                    <th className="px-6 py-4 text-left">Status</th>
                    <th className="px-6 py-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {discountData?.map((discount: any, index: number) => (
                    <motion.tr
                      key={index + 1}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border-t border-[#1a2d6d] hover:bg-[#000a3a]/50 transition-colors"
                    >
                      <td className="px-6 py-4">{discount?.content?.title}</td>
                      <td className="px-6 py-4">
                        {discount?.startDate}
                      </td>
                      <td className="px-6 py-4">
                        {discount?.startDate}
                      </td>
                      <td className="px-6 py-4">{discount?.percentage}%</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-sm ${
                            discount.isActive
                              ? "bg-green-500/20 text-green-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {discount.isActive ? "Active" : "Deactivate"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-2xl flex gap-3">
                        <MdDeleteOutline
                        //   onClick={() => {
                        //     setContentToDelete(movie);
                        //     setIsDeleteModalOpen(true);
                        //   }}
                        />
                        <FaPen
                          className="text-xl"
                          //   onClick={() => {
                          //     setUpdateModalOpen(true);
                          //     setContent(movie);
                          //   }}
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
      </div>
    </div>
  );
};

export default DiscountManagement;
