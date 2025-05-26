import React from 'react';
import UserReviews from '@/components/Dashboardlayout/Reviews/UserReviews';

const ReviewsPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white mb-6">My Movie Reviews</h1>
      <UserReviews />
    </div>
  );
};

export default ReviewsPage;
