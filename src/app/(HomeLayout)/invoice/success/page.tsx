"use client";
import { motion } from "framer-motion";
import { FiFilm, FiDownload } from "react-icons/fi";
import { useParams, useSearchParams } from "next/navigation";
import { useGetPaymentWithVerifyQuery } from "@/components/redux/features/payment/paymentApi";
 

const MovieInvoice = () => {

  const searchParams = useSearchParams();
  const tarnId = searchParams.get("tran_id");

  const { data } = useGetPaymentWithVerifyQuery(tarnId);
  const paymentData = data?.data;
  console.log("paymentData", paymentData);
  
  if (!paymentData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#00031b]">
        <motion.div
          transition={{ duration: 1, repeat: Infinity }}
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  
  return (
    <div className="   bg-[#00031b] pt-28 pb-20 ">
      {paymentData?.map((item : any, index: number) => (
        <motion.div key={index} className="max-w-4xl mx-auto bg-[#060a2d] text-white rounded-xl shadow-2xl overflow-hidden">
          {/* Header Section */}
          <div className="p-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="flex items-center mb-4 md:mb-0">
                <FiFilm className="text-3xl mr-3" />
                <h1 className="text-2xl font-bold">CineVerse</h1>
              </div>
              <div className="text-right">
                <h2 className="text-3xl font-semibold">Invoice</h2>
                <p className="mt-1 text-white/80">
                  #{item?.transactionId}
                </p>
              </div>
            </div>
          </div>

          {/* Customer Info */}
          <div className="p-8 flex flex-col md:flex-row justify-between border-b border-white/10">
            <div>
              <h3 className="text-lg font-semibold mb-3">Customer Info:</h3>
              <p>{item?.user?.name}</p>
              <p>{item?.user?.email}</p>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between md:block">
                <span className="text-white/70">Issue Date:</span>
                <span className="font-medium">{item?.createdAt?.slice(0, 10)}</span>
              </div>
              <div className="flex justify-between md:block">
                {/* <span className="text-white/70">Due Date:</span>
                <span className="font-medium">{invoiceData.dueDate}</span> */}
              </div>
              <div className="flex justify-between md:block">
                <span className="text-white/70">Payment Status: </span>
                <span className="font-medium">{item?.status}</span>
              </div>
               
            </div>
          </div>

          {/* Movie List */}
          <div className="p-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="text-left py-4 px-4 text-white font-medium">
                      Movie
                    </th>
                    <th className="text-right py-4 px-4 text-white font-medium">
                      Price
                    </th>
                     
                  </tr>
                </thead>
                <tbody>
                  <motion.tr
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-b border-white/10"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        {item.content?.thumbnail ? (
                          <img
                            src={item.content?.thumbnail}
                            className="w-12 h-16 rounded-md object-cover mr-4"
                            alt={item.title}
                          />
                        ) : (
                          <div className="w-12 h-16 bg-gray-700 rounded-md mr-4 flex items-center justify-center">
                            <FiFilm className="text-gray-300" />
                          </div>
                        )}
                        <span className="font-medium">
                          {item.content?.title}
                        </span>
                      </div>
                    </td>
 
                    {/* <td className="py-4 px-4 text-right">{item.quantity}</td> */}
                    <td className="py-4 px-4 text-right font-medium">
                      ${item.amount}
                    </td>
                  </motion.tr>
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-8 flex justify-end"
            >
              <div className="w-full md:w-64">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-white/70">Subtotal:</span>
                    <span className="font-medium">${item?.amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Tax 0%:</span>
                    <span className="font-medium">$0</span>
                  </div>
                  <div className="flex justify-between pt-4 border-t border-white/10">
                    <span className="text-lg font-bold">Total:</span>
                    <span className="text-lg font-bold text-blue-400">
                      ${item?.amount}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Footer */}
          <div className="p-8 bg-white/5 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-center md:text-left text-sm text-white/60">
                <p>Thank you for using Bangla Cinema!</p>
                <p>For help, call: +880 1711-XXXXXX</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => window.print()}
                  className="flex cursor-pointer items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <FiDownload className="text-lg" />
                  Download
                </button>
                 
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default MovieInvoice;
