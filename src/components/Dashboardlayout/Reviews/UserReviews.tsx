"use client";

import React from 'react';
import { useAppSelector } from '@/components/redux/hooks';
import { selectCurrentToken } from '@/components/redux/features/auth/authSlice';
import { verifyToken } from '@/utils/verifyToken';
import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { useGetAllReviewQuery } from '@/components/redux/features/review/reviewApi';
import { formatDate } from '@/utils/FormateDate';

const UserReviews = () => {
  const token = useAppSelector(selectCurrentToken);
  let user: any;
  if (token) {
    user = verifyToken(token);
  }

  const { data: reviews, isLoading } = useGetAllReviewQuery(undefined);
  console.log(reviews);

  // Filter reviews by current user ID
  const userReviews = reviews?.data?.filter((review: any) => review.userId === user?.id);
  console.log(userReviews);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-gray-800/50 rounded-lg p-3 md:p-4 animate-pulse">
            <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-4">
              <div className="w-16 h-24 md:w-20 md:h-28 bg-gray-700 rounded-md flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-700 rounded w-3/4" />
                <div className="h-4 bg-gray-700 rounded w-1/2" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-700 rounded" />
              <div className="h-4 bg-gray-700 rounded w-5/6" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!userReviews?.length) {
    return (
      <div className="text-center py-8 md:py-12">
        <h3 className="text-lg md:text-xl text-gray-400">No reviews yet</h3>
        <p className="text-gray-500 mt-2 text-sm md:text-base">Start reviewing movies to see them here!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {userReviews.map((review: any) => (
        <div 
          key={review.id} 
          className="bg-gray-800/50 rounded-lg p-3 md:p-4 hover:bg-gray-800/70 transition-colors duration-300"
        >
          <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-4">
            <Link 
              href={`/movies/${review?.content?.id}`}
              className="flex-shrink-0"
            >
              <Image
                src={review?.content?.thumbnail}
                alt={review?.content?.title}
                width={80}
                height={112}
                className="rounded-md object-cover w-16 h-24 md:w-20 md:h-28"
              />
            </Link>
            <div className="flex-1 min-w-0">
              <Link 
                href={`/movies/${review?.content?.id}`}
                className="text-base md:text-lg font-semibold text-white hover:text-blue-400 transition-colors block truncate"
              >
                {review?.content?.title}
              </Link>
              <div className="flex items-center gap-1 mt-1">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-sm text-gray-300">{review?.rating}/10</span>
              </div>

              <p className="text-sm text-gray-400 mt-1">
                {formatDate(review?.createdAt)}
              </p>
            </div>
          </div>
          <p className="text-sm md:text-base text-gray-300 line-clamp-3">{review?.reviewText}</p>
        </div>
      ))}
    </div>
  );
};

export default UserReviews; 