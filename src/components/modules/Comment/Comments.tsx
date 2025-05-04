'use client';

import { useCreateCommentMutation, useGetCommentsQuery } from '@/components/redux/features/comments/commentsApi';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface Comment {
  id: string;
  reviewId: string;
  userId: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    contactNumber: string;
    status: string;
    profilePhoto: string;
    createdAt: string;
    updatedAt: string;
  };
}

interface PaginatedResponse {
  data: Comment[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

const Comments = ({ UserData, ReviewData }: { UserData: any; ReviewData: any }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [showInput, setShowInput] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { register, handleSubmit, reset } = useForm<{ comment: string }>();

  // Fetch paginated comments for the specific review
  const { data, isLoading, isError } = useGetCommentsQuery(
    { reviewId: ReviewData.id, page, limit: 3 },
    { skip: !ReviewData.id }
  );

  // Handle the fetched comments
  useEffect(() => {
    if (data?.data) {
      setComments(data.data);
      if (data.meta) {
        setTotalPages(data.meta.totalPages);
      }
    }
  }, [data]);

  const [addComment] = useCreateCommentMutation();

  const onSubmitComment = async (data: { comment: string }) => {
    if (!UserData?.id) {
      console.error('User data not available');
      return;
    }

    const newComment = {
      reviewId: ReviewData.id,
      userId: UserData.id,
      comment: data.comment
    };

    try {
      const response = await addComment(newComment);
      if (response?.data) {
        // Add the new comment with user data
        const commentWithUser = {
          ...response.data,
          user: {
            id: UserData.id,
            name: UserData.name,
            email: UserData.email,
            role: UserData.role,
            contactNumber: UserData.contactNumber,
            status: UserData.status,
            profilePhoto: UserData.profilePhoto,
            createdAt: UserData.createdAt,
            updatedAt: UserData.updatedAt
          }
        };
        setComments([...comments, commentWithUser]);
        setShowInput(false);
      } else {
        console.error('Failed to submit comment');
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
    }

    reset();
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="mt-6 border-t border-gray-700 pt-4">
      {showInput && (
        <form onSubmit={handleSubmit(onSubmitComment)} className="mb-4 space-y-2">
          <textarea
            {...register('comment', { required: true })}
            className="w-full p-2 bg-gray-800 text-white border border-gray-600 rounded-md resize-none"
            rows={3}
            placeholder={!UserData ? "Please log in to comment..." : "Write your comment..."}
            disabled={!UserData}
          />
          <button
            type="submit"
            disabled={!UserData}
            className={`px-3 py-1 text-sm text-white rounded-md ${
              UserData 
                ? 'bg-blue-600 hover:bg-blue-700' 
                : 'bg-gray-600 cursor-not-allowed'
            }`}
          >
            {!UserData ? 'Please Log In to Comment' : 'Post Comment'}
          </button>
        </form>
      )}

      {isLoading ? (
        <p className="text-gray-300">Loading comments...</p>
      ) : isError ? (
        <p className="text-red-400">Error loading comments</p>
      ) : (
        <div className="text-sm text-gray-300 space-y-4">
          {comments.map((comment) => (

            <div key={comment.id} className="mb-4 ml-0 md:ml-4 border-l border-gray-700 pl-4">
              <div className="flex items-center gap-2 mb-2">
                {comment.user?.profilePhoto && (
                  <img
                    src={comment.user.profilePhoto}
                    alt={comment.user?.name || 'User'}
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <div>
                  <p className="text-xs text-gray-400">
                    {comment.createdAt && new Date(comment.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  <p className="text-white font-medium">{comment.user?.name || 'Anonymous'}</p>
                </div>
              </div>
              <p className="text-gray-300">{comment.comment}</p>
            </div>
          ))}
        </div>
      )}

      {comments.length > 0 && (
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handlePrevPage}
            className="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-800 text-white rounded-md disabled:opacity-50"
            disabled={page === 1}
          >
            Previous
          </button>
          <span className="text-sm text-gray-400">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            className="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-800 text-white rounded-md disabled:opacity-50"
            disabled={page >= totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Comments;
