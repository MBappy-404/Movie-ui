"use client";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { useCreateDiscountsMutation } from "../redux/features/discount/discountApi";
import { toast } from "sonner";

interface AddDiscountModalProps {
  isAddDiscountModalOpen: boolean;
  setIsAddDiscountModalModalOpen: (isOpen: boolean) => void;
  content: any;
}

const AddDiscountModal = ({
  isAddDiscountModalOpen,
  setIsAddDiscountModalModalOpen,
  content,
}: AddDiscountModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm();
  const [startDate, setStartDate] = React.useState<Date>();
  const [endDate, setEndDate] = React.useState<Date>();
  const [addDiscount] = useCreateDiscountsMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Adding Discount....", { duration: 2000 });

    const discountData = {
      contentId: content.id,
      percentage: Number(data.percentage),
      startDate: startDate?.toISOString(),
      endDate: endDate?.toISOString(),
    };

    //console.log(discountData);

    try {
      const res = await addDiscount(discountData);
      console.log(res);
      if ("error" in res && res.error) {
        const errorMessage =
          (res.error as any)?.data?.message || "An error occurred";
        toast.error(errorMessage, { id: toastId });
        setIsAddDiscountModalModalOpen(false);
        reset();
      } else {
        toast.success(res?.data?.message, { id: toastId });
        setIsAddDiscountModalModalOpen(false);
        reset();
      }
    } catch (error: any) {
      toast.error(error.data.message, { id: toastId, duration: 2000 });
      setIsAddDiscountModalModalOpen(false);
      reset();
    }
  };

  return (
    <div>
      <AnimatePresence>
        {isAddDiscountModalOpen && (
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
                <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                  Add Discount
                </h2>

                {/* Form Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    {/* Start Date Picker */}
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-300">
                        Start Date
                      </label>
                      popover
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    {/* End Date Picker */}
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-300">
                        End Date
                      </label>
                      popover
                    </div>
                  </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-6 space-y-4">
                  {/* Discount Percentage */}
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-300">
                      Discount Percentage
                    </label>
                    <div className="flex items-center">
                      <input
                        {...register("percentage", {
                          required: true,
                          min: 1,
                          max: 100,
                        })}
                        type="text"
                        className="w-40 bg-[#0a1235] border border-[#1a2d6d] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Discount"
                      />
                      <span className="ml-2 text-gray-400">%</span>
                    </div>
                    {errors.percentage && (
                      <span className="text-red-400 text-sm">
                        Please enter a value between 1-100
                      </span>
                    )}
                  </div>
                </div>

                {/* Form Buttons */}
                <div className="mt-8 flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddDiscountModalModalOpen(false);
                      reset();
                      setStartDate(undefined);
                      setEndDate(undefined);
                    }}
                    className="px-6 py-2 cursor-pointer rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-blue-500 to-purple-500 cursor-pointer px-6 py-2 rounded-lg transition-colors"
                  >
                    Add Discount
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

export default AddDiscountModal;
