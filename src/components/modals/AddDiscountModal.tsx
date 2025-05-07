"use client";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";
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
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [percentage, setPercentage] = useState<string>("");
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);
  const [startCalendarMonth, setStartCalendarMonth] = useState(new Date().getMonth());
  const [startCalendarYear, setStartCalendarYear] = useState(new Date().getFullYear());
  const [endCalendarMonth, setEndCalendarMonth] = useState(new Date().getMonth());
  const [endCalendarYear, setEndCalendarYear] = useState(new Date().getFullYear());
  const [addDiscount] = useCreateDiscountsMutation();
  const startCalendarRef = useRef<HTMLDivElement>(null);
  const endCalendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (startCalendarRef.current && !startCalendarRef.current.contains(event.target as Node)) {
        setShowStartCalendar(false);
      }
      if (endCalendarRef.current && !endCalendarRef.current.contains(event.target as Node)) {
        setShowEndCalendar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const renderDays = (month: number, year: number, view: "start" | "end") => {
    const daysInMonth = getDaysInMonth(month, year);
    const firstDay = getFirstDayOfMonth(month, year);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-8 h-8"></div>);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isStartSelected = startDate && date.toDateString() === startDate.toDateString();
      const isEndSelected = endDate && date.toDateString() === endDate.toDateString();
      const isInRange = startDate && endDate && date >= startDate && date <= endDate;
      const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));

      const handleDayClick = () => {
        if (view === "start") {
          setStartDate(date);
          if (endDate && date > endDate) {
            setEndDate(null);
          }
          setShowStartCalendar(false);
        } else {
          if (startDate && date < startDate) {
            toast.error("End date cannot be before start date");
            return;
          }
          setEndDate(date);
          setShowEndCalendar(false);
        }
      };

      days.push(
        <div
          key={`day-${day}`}
          onClick={!isPast ? handleDayClick : undefined}
          className={`w-8 h-8 flex items-center justify-center rounded-full cursor-pointer text-sm
            ${isStartSelected ? "bg-blue-500 text-white" : ""}
            ${isEndSelected ? "bg-purple-500 text-white" : ""}
            ${isInRange && !isStartSelected && !isEndSelected ? "bg-blue-200/20" : ""}
            ${isPast ? "text-gray-500 cursor-not-allowed" : "hover:bg-gray-700"}
          `}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  const prevMonth = (view: "start" | "end") => {
    if (view === "start") {
      if (startCalendarMonth === 0) {
        setStartCalendarMonth(11);
        setStartCalendarYear(startCalendarYear - 1);
      } else {
        setStartCalendarMonth(startCalendarMonth - 1);
      }
    } else {
      if (endCalendarMonth === 0) {
        setEndCalendarMonth(11);
        setEndCalendarYear(endCalendarYear - 1);
      } else {
        setEndCalendarMonth(endCalendarMonth - 1);
      }
    }
  };

  const nextMonth = (view: "start" | "end") => {
    if (view === "start") {
      if (startCalendarMonth === 11) {
        setStartCalendarMonth(0);
        setStartCalendarYear(startCalendarYear + 1);
      } else {
        setStartCalendarMonth(startCalendarMonth + 1);
      }
    } else {
      if (endCalendarMonth === 11) {
        setEndCalendarMonth(0);
        setEndCalendarYear(endCalendarYear + 1);
      } else {
        setEndCalendarMonth(endCalendarMonth + 1);
      }
    }
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('en-US', { month: 'long' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const handleStartDateClick = () => {
    const now = new Date();
    setStartCalendarMonth(now.getMonth());
    setStartCalendarYear(now.getFullYear());
    setShowStartCalendar(!showStartCalendar);
    setShowEndCalendar(false);
  };

  const handleEndDateClick = () => {
    const now = new Date();
    setEndCalendarMonth(now.getMonth());
    setEndCalendarYear(now.getFullYear());
    setShowEndCalendar(!showEndCalendar);
    setShowStartCalendar(false);
  };

  const handleSubmit = async () => {
    if (!startDate || !endDate) {
      toast.error("Please select both start and end dates");
      return;
    }

    if (!percentage || Number(percentage) < 1 || Number(percentage) > 100) {
      toast.error("Please enter a valid discount percentage between 1-100");
      return;
    }

    const toastId = toast.loading("Adding Discount....", { duration: 2000 });

    const discountData = {
      contentId: content.id,
      percentage: Number(percentage),
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    };

    try {
      const res = await addDiscount(discountData);
      if ("error" in res && res.error) {
        const errorMessage =
          (res.error as any)?.data?.message || "An error occurred";
        toast.error(errorMessage, { id: toastId });
        setIsAddDiscountModalModalOpen(false);
      } else {
        toast.success(res?.data?.message, { id: toastId });
        setIsAddDiscountModalModalOpen(false);
      }
    } catch (error: any) {
      toast.error(error.data.message, { id: toastId, duration: 2000 });
      setIsAddDiscountModalModalOpen(false);
    }
  };

  const resetForm = () => {
    setStartDate(null);
    setEndDate(null);
    setPercentage("");
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
              <div className="p-8 max-h-[90vh] overflow-y-auto">
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
                      <div className="relative" ref={startCalendarRef}>
                        <input
                          type="text"
                          readOnly
                          value={formatDate(startDate)}
                          onClick={handleStartDateClick}
                          className="w-full bg-[#0a1235] border border-[#1a2d6d] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
                          placeholder="Select start date"
                        />
                        {showStartCalendar && (
                          <div className="absolute z-10 mt-1 w-64 bg-[#0a1235] border border-[#1a2d6d] rounded-lg shadow-lg p-4">
                            <div className="flex justify-between items-center mb-4">
                              <button
                                type="button"
                                onClick={() => prevMonth("start")}
                                className="p-1 rounded-full hover:bg-gray-700"
                              >
                                &lt;
                              </button>
                              <div className="font-medium">
                                {months[startCalendarMonth]} {startCalendarYear}
                              </div>
                              <button
                                type="button"
                                onClick={() => nextMonth("start")}
                                className="p-1 rounded-full hover:bg-gray-700"
                              >
                                &gt;
                              </button>
                            </div>
                            <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-400 mb-2">
                              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                                <div key={day}>{day}</div>
                              ))}
                            </div>
                            <div className="grid grid-cols-7 gap-1">
                              {renderDays(startCalendarMonth, startCalendarYear, "start")}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    {/* End Date Picker */}
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-300">
                        End Date
                      </label>
                      <div className="relative" ref={endCalendarRef}>
                        <input
                          type="text"
                          readOnly
                          value={formatDate(endDate)}
                          onClick={handleEndDateClick}
                          className="w-full bg-[#0a1235] border border-[#1a2d6d] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
                          placeholder="Select end date"
                        />
                        {showEndCalendar && (
                          <div className="absolute z-10 mt-1 w-64 bg-[#0a1235] border border-[#1a2d6d] rounded-lg shadow-lg p-4">
                            <div className="flex justify-between items-center mb-4">
                              <button
                                type="button"
                                onClick={() => prevMonth("end")}
                                className="p-1 rounded-full hover:bg-gray-700"
                              >
                                &lt;
                              </button>
                              <div className="font-medium">
                                {months[endCalendarMonth]} {endCalendarYear}
                              </div>
                              <button
                                type="button"
                                onClick={() => nextMonth("end")}
                                className="p-1 rounded-full hover:bg-gray-700"
                              >
                                &gt;
                              </button>
                            </div>
                            <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-400 mb-2">
                              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                                <div key={day}>{day}</div>
                              ))}
                            </div>
                            <div className="grid grid-cols-7 gap-1">
                              {renderDays(endCalendarMonth, endCalendarYear, "end")}
                            </div>
                          </div>
                        )}
                      </div>
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
                        type="number"
                        value={percentage}
                        onChange={(e) => setPercentage(e.target.value)}
                        min="1"
                        max="100"
                        className="w-40 bg-[#0a1235] border border-[#1a2d6d] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Discount"
                      />
                      <span className="ml-2 text-gray-400">%</span>
                    </div>
                    {percentage && (Number(percentage) < 1 || Number(percentage) > 100) && (
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
                      resetForm();
                    }}
                    className="px-6 py-2 cursor-pointer rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 cursor-pointer px-6 py-2 rounded-lg transition-colors"
                  >
                    Add Discount
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AddDiscountModal;