"use client";
import { motion } from "framer-motion";
import { FiFilm, FiDownload } from "react-icons/fi";
import { useSearchParams } from "next/navigation";
import { useGetPaymentWithVerifyQuery } from "@/components/redux/features/payment/paymentApi";

const MovieInvoice = () => {
  const searchParams = useSearchParams();
  const tarnId = searchParams.get("tran_id");
  const { data } = useGetPaymentWithVerifyQuery(tarnId);
  const paymentData = data?.data;

<<<<<<< HEAD
  const generateMockData = () => ({
    invoiceNumber: `CINEFLIX-${Math.floor(1000 + Math.random() * 9000)}`,
    customerName: "Raj Shekhar",
    customerEmail: "raj@example.com",
    items: [
      {
        id: "1",
        title: "Gangs of Wasseypur",
        format: 'HD' as const,
        quantity: 2,
        price: 299,
        poster: "/path/to/poster1.jpg"
      },
      {
        id: "2",
        title: "Kabuliwala",
        format: '4K' as const,
        quantity: 1,
        price: 499,
        poster: "/path/to/poster2.jpg"
      }
    ],
    issueDate: new Date().toLocaleDateString(),
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    paymentStatus: 'pending' as const
  });

  useEffect(() => {
    const fetchInvoiceData = () => {
      setTimeout(() => {
        setInvoiceData(generateMockData());
      }, 1500);
    };
    fetchInvoiceData();
  }, []);

  if (!invoiceData) {
=======
  if (!paymentData) {
>>>>>>> 015de0925662d2a4be933864de73d7a416f55454
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#00031b]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity }}
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="bg-[#00031b] pt-28 pb-20 px-4">
      {paymentData?.map((item: any, index: number) => (
        <motion.div
          key={index}
          className="max-w-4xl mx-auto bg-[#060a2d] text-white rounded-xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 sm:p-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div className="flex items-center gap-3">
                <FiFilm className="text-3xl" />
                <h1 className="text-2xl font-bold">CineVerse</h1>
              </div>
              <div className="text-left sm:text-right">
                <h2 className="text-2xl font-semibold">Invoice</h2>
                <p className="text-white/80 mt-1">
                  #{item?.transactionId?.slice(0, 20)}
                </p>
              </div>
            </div>
          </div>

          {/* Customer Info */}
          <div className="p-6 sm:p-8 flex flex-col sm:flex-row justify-between border-b border-white/10 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Customer Info:</h3>
            
              <div className="flex justify-between sm:block">
                <span className="text-white/70">Customer:</span>
                <span className="font-medium block pl-1 sm:inline">
                {item?.user?.name}
                </span>
              </div>
              <div className="flex justify-between sm:block">
                <span className="text-white/70">Email:</span>
                <span className="font-medium block pl-1 sm:inline">
                {item?.user?.email}
                </span>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between sm:block">
                <span className="text-white/70">Issue Date:</span>
                <span className="font-medium block pl-1 sm:inline">
                  {item?.createdAt?.slice(0, 10)}
                </span>
              </div>
              <div className="flex justify-between sm:block">
                <span className="text-white/70">Payment Status:</span>
                <span className="font-medium block pl-1 sm:inline">
                  {item?.status}
                </span>
              </div>
              <div className="flex justify-between sm:block">
                <span className="text-white/70">Purchase Status:</span>
                <span className="font-medium block pl-1 sm:inline">
                  {item?.purchaseStatus}
                </span>
              </div>
            </div>
          </div>

          {/* Movie List */}
          <div className="p-6 sm:p-8">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[300px]">
                <thead className="bg-white/5">
                  <tr>
                    <th className="text-left py-3 px-4 text-white font-medium">
                      Movie
                    </th>
                    <th className="text-right py-3 px-4 text-white font-medium">
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
                      <div className="flex items-center gap-4">
                        {item.content?.thumbnail ? (
                          <img
                            src={item.content?.thumbnail}
                            alt={item.content?.title}
                            className="w-12 h-16 rounded-md object-cover"
                          />
                        ) : (
                          <div className="w-12 h-16 bg-gray-700 rounded-md flex items-center justify-center">
                            <FiFilm className="text-gray-300" />
                          </div>
                        )}
                        <span className="font-medium text-sm md:text-base">
                          {item.content?.title}
                        </span>
                      </div>
                    </td>
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
              <div className="w-full sm:w-64 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/70">Subtotal:</span>
                  <span className="font-medium">${item.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Tax 0%:</span>
                  <span className="font-medium">$0</span>
                </div>
                <div className="flex justify-between pt-4 border-t border-white/10">
                  <span className="text-lg font-bold">Total:</span>
                  <span className="text-lg font-bold text-blue-400">
                    ${item.amount}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Footer */}
          <div className="p-6 sm:p-8 bg-white/5 border-t border-white/10">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-white/60">
              <div className="text-center sm:text-left">
                <p>Thank you for using CineVerse!</p>
                <p>For help, call: +880 1711-XXXXXX</p>
              </div>
              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 px-5 py-3 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                <FiDownload />
                Download
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default MovieInvoice;
