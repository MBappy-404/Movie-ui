"use client";
import { motion } from 'framer-motion';
import { FiFilm, FiDownload } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';

interface InvoiceItem {
  id: string;
  title: string;
  format: '4K' | 'HD' | 'SD';
  quantity: number;
  price: number;
  poster?: string;
}

const MovieInvoice = () => {
  const [invoiceData, setInvoiceData] = useState<{
    invoiceNumber: string;
    customerName: string;
    customerEmail: string;
    items: InvoiceItem[];
    issueDate: string;
    dueDate: string;
    paymentStatus: 'paid' | 'pending';
  } | null>(null);

  const searchParams = useSearchParams();
  const tarnId = searchParams.get("tran_id");
  console.log(tarnId);

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
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#00031b]">
        <motion.div
           
          transition={{ duration: 1, repeat: Infinity }}
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  const subtotal = invoiceData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const taxRate = 0.1;
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  
  

  return (
    <div className="min-h-screen translate-y-20 bg-[#00031b] p-6 md:p-12">
  <motion.div
    className="max-w-4xl mx-auto bg-[#060a2d] text-white rounded-xl shadow-2xl overflow-hidden"
  >
    {/* Header Section */}
    <div className="p-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <FiFilm className="text-3xl mr-3" />
          <h1 className="text-2xl font-bold">CineVerse</h1>
        </div>
        <div className="text-right">
          <h2 className="text-3xl font-semibold">Invoice</h2>
          <p className="mt-1 text-white/80">#{invoiceData.invoiceNumber}</p>
        </div>
      </div>
    </div>

    {/* Customer Info */}
    <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-white/10">
      <div>
        <h3 className="text-lg font-semibold mb-3">Customer Info:</h3>
        <p>{invoiceData.customerName}</p>
        <p>{invoiceData.customerEmail}</p>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between md:block">
          <span className="text-white/70">Issue Date:</span>
          <span className="font-medium">{invoiceData.issueDate}</span>
        </div>
        <div className="flex justify-between md:block">
          <span className="text-white/70">Due Date:</span>
          <span className="font-medium">{invoiceData.dueDate}</span>
        </div>
        <div
          className={`badge ${
            invoiceData.paymentStatus === 'paid'
              ? 'bg-green-100 text-green-800'
              : 'bg-yellow-100 text-yellow-800'
          } px-4 py-2 rounded-full`}
        >
          {invoiceData.paymentStatus.toUpperCase()}
        </div>
      </div>
    </div>

    {/* Movie List */}
    <div className="p-8">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-white/5">
            <tr>
              <th className="text-left py-4 px-4 text-white font-medium">Movie</th>
              <th className="text-left py-4 px-4 text-white font-medium">Format</th>
              <th className="text-right py-4 px-4 text-white font-medium">Price</th>
              <th className="text-right py-4 px-4 text-white font-medium">Quantity</th>
              <th className="text-right py-4 px-4 text-white font-medium">Total</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.items.map((item, index) => (
              <motion.tr
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border-b border-white/10"
              >
                <td className="py-4 px-4">
                  <div className="flex items-center">
                    {item.poster ? (
                      <img
                        src={item.poster}
                        className="w-12 h-16 rounded-md object-cover mr-4"
                        alt={item.title}
                      />
                    ) : (
                      <div className="w-12 h-16 bg-gray-700 rounded-md mr-4 flex items-center justify-center">
                        <FiFilm className="text-gray-300" />
                      </div>
                    )}
                    <span className="font-medium">{item.title}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span
                    className={`px-2 py-1 rounded-md ${
                      item.format === '4K'
                        ? 'bg-purple-100 text-purple-800'
                        : item.format === 'HD'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {item.format}
                  </span>
                </td>
                <td className="py-4 px-4 text-right">${item.price.toFixed(2)}</td>
                <td className="py-4 px-4 text-right">{item.quantity}</td>
                <td className="py-4 px-4 text-right font-medium">
                  ${(item.quantity * item.price).toFixed(2)}
                </td>
              </motion.tr>
            ))}
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
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/70">Tax (10%):</span>
              <span className="font-medium">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between pt-4 border-t border-white/10">
              <span className="text-lg font-bold">Total:</span>
              <span className="text-lg font-bold text-blue-400">${total.toFixed(2)}</span>
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
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FiDownload className="text-lg" />
            Download
          </button>
          {invoiceData.paymentStatus === 'pending' && (
            <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Make Payment
            </button>
          )}
        </div>
      </div>
    </div>
  </motion.div>
</div>

  );
};

export default MovieInvoice;
