"use client";

import { useGetUserQuery } from "@/components/redux/features/user/userApi";
import { Rating } from "@smastrom/react-rating";
import Image from "next/image";
import React from "react";
import Comments from "../Comment/Comments";

// Separate component for individual review items
const ReviewItem = ({
  item,
  UserData,
}: {
  item: any;
  UserData: any;
}) => {
  const { data: SingleUser } = useGetUserQuery(item.userId);

  const date = new Date(item.createdAt);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex flex-col gap-4 border-b border-gray-700 pb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-shrink-0">
          <Image
            src={item?.user?.profilePhoto}
            alt="Reviewer Avatar"
            width={60}
            height={60}
            className="rounded-full"
          />
        </div>
        <div className="flex-grow">
          <div className="flex items-center gap-2">
            <Rating style={{ maxWidth: 80 }} value={item.rating} readOnly />
            <p className="text-sm text-gray-400">{formattedDate}</p>
          </div>
          <p className="font-semibold text-white mt-1">
            {SingleUser?.data?.name || "Anonymous"}
          </p>
          <p className="mt-2 text-gray-300 text-sm">{item.reviewText}</p>
        </div>
      </div>

      {/* ✅ Specific comment section for this review */}
      <Comments UserData={UserData} ReviewData={item} />
    </div>
  );
};

const ReviewCard = ({
  ReviewData,
  UserData,
}: {
  ReviewData: any;
  UserData: any;
}) => {
  const publishedReviews = ReviewData?.data?.filter(
    (item: any) => item.status === "PUBLISHED"
  );

  console.log(publishedReviews);

  return (
    <div>
      {!publishedReviews?.length && <p>No reviews found</p>}
      {publishedReviews?.length > 0 && (
        <div className="bg-gray-900 rounded-lg p-6 shadow-md flex flex-col gap-6">
          {publishedReviews?.map((item: any, index: number) => (
            <ReviewItem
              key={item.id || index}
              item={item}
              UserData={UserData}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
