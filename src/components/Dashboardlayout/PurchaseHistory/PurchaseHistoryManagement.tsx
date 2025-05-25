"use client";

import { usePurchaseHistoryQuery } from "@/components/redux/features/payment/paymentApi";
import Image from "next/image";
import Link from "next/link";

const PurchaseHistoryManagement = () => {
  const { data: purchaseHistory } = usePurchaseHistoryQuery([]);
  console.log(purchaseHistory);

  return (
    <div className="overflow-x-auto mt-10">
      <table className="min-w-full table-auto border-collapse border border-white/10 rounded-xl overflow-hidden">
        <thead className="bg-white/5">
          <tr>
            <th className="text-left px-6 py-4 text-white font-medium whitespace-nowrap">
              Thumbnail
            </th>
            <th className="text-left px-6 py-4 text-white font-medium whitespace-nowrap">
              Name
            </th>
            <th className="text-left px-6 py-4 text-white font-medium whitespace-nowrap">
              Price
            </th>
            <th className="text-left px-6 py-4 text-white font-medium whitespace-nowrap">
              Date
            </th>
            <th className="text-left px-6 py-4 text-white font-medium whitespace-nowrap">
              Type
            </th>
            <th className="text-left px-6 py-4 text-white font-medium whitespace-nowrap">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10 bg-[#060a2d] text-white">
          {purchaseHistory?.data?.map((movie: any) => (
            <tr key={movie.id} className="">
              <td className="px-6 py-4 w-[100px]">
                <Image
                  src={movie?.content?.thumbnail}
                  alt={movie?.content?.title}
                  width={100}
                  height={150}
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTUwIj48ZGVmcz48Y2lyY2xlIGN4PSI1MCIgY3k9Ijc1IiByPSI1MCIgZmlsbD0iI2ZmZmZmZiIvPjwvZGVmcz48Zz48Y2lyY2xlIGN4PSI1MCIgY3k9Ijc1IiByPSI1MCIgZmlsbD0iIzAwMDAwMCIvPjwvZz48L3N2Zz4K"
                  className="w-16 h-24 object-cover rounded-md border border-white/10"
                />
              </td>
              <td className="px-6 py-4 font-semibold whitespace-nowrap">
                <Link
                  href={`/movies/${movie?.content?.id}`}
                  className="hover:text-blue-400 transition-colors"
                >
                  {movie?.content?.title}
                </Link>
              </td>

              <td className="px-6 py-4">${movie?.amount}</td>
              <td className="px-6 py-4">{movie?.createdAt?.slice(0, 10)}</td>
              <td className="px-6 py-4">{movie?.purchaseStatus}</td>
              <td className="px-6 py-4 capitalize">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    movie?.status === "PAID"
                      ? "bg-green-600/20 text-green-400"
                      : "bg-red-600/20 text-red-400"
                  }`}
                >
                  {movie?.status || "Pending"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PurchaseHistoryManagement;
