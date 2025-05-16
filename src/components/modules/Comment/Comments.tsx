"use client";

import {
  useCreateCommentMutation,
  useGetCommentsQuery,
  useGetCommentsByParentIdQuery,
} from "@/components/redux/features/comments/commentsApi";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface Comment {
  id: string;
  reviewId: string;
  userId: string;
  parentId?: string;
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
  replies?: Comment[];
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

const CommentItem = ({
  comment,
  UserData,
  onReply,
  level = 0,
}: {
  comment: Comment;
  UserData: any;
  onReply: (parentId: string) => void;
  level?: number;
}) => {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const { register, handleSubmit, reset } = useForm<{ comment: string }>();
  const [addComment] = useCreateCommentMutation();
  const [replyPage, setReplyPage] = useState(1);
  const [replyTotalPages, setReplyTotalPages] = useState(1);
  const [replies, setReplies] = useState<Comment[]>([]);
  const [showReplies, setShowReplies] = useState(false);

  // Fetch replies for this comment
  const { data: repliesData, isLoading: isLoadingReplies } =
    useGetCommentsByParentIdQuery(
      { parentId: comment.id, page: replyPage, limit: 3 },
      { skip: !comment.id || !showReplies }
    );

  // Update replies when data changes
  useEffect(() => {
    if (repliesData?.data) {
      //console.log('Parent Comment:', comment);
      //console.log('Replies data received:', repliesData.data.data);
      setReplies(repliesData.data.data);
      if (repliesData.meta) {
        setReplyTotalPages(repliesData.meta.totalPages);
      }
    }
  }, [repliesData]);

  const onSubmitReply = async (formData: { comment: string }) => {
    if (!UserData?.id) {
      toast.error("User data not available");
      return;
    }

    const newReply = {
      reviewId: comment.reviewId,
      userId: UserData.id,
      parentId: comment.id,
      comment: formData.comment,
    };

    try {
      const response = await addComment(newReply).unwrap();

      if (response?.data) {
        const replyWithUser = {
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
            updatedAt: UserData.updatedAt,
          },
        };

        // Add the reply to the replies state
        setReplies((prevReplies) => [replyWithUser, ...prevReplies]);
        setShowReplyInput(false);
        reset();
        toast.success("Reply added successfully");
      }
    } catch (error) {
      console.error("Error submitting reply:", error);
      toast.error("Error adding reply");
    }
  };

  const handleNextReplyPage = () => {
    if (replyPage < replyTotalPages) {
      setReplyPage(replyPage + 1);
    }
  };

  const handlePrevReplyPage = () => {
    if (replyPage > 1) {
      setReplyPage(replyPage - 1);
    }
  };

  const toggleReplies = () => {
    setShowReplies(!showReplies);
    if (!showReplies) {
      setReplyPage(1); // Reset to first page when showing replies
    }
  };

  return (
    <div
      className={`mb-4 ${level > 0 ? "ml-4 md:ml-8 border-l-2 border-gray-700 pl-4" : ""
        }`}
    >
      <div className="flex flex-col sm:flex-row items-start gap-3">
        <div className="flex-shrink-0">
          {comment.user?.profilePhoto ? (
            <img
              src={comment.user.profilePhoto}
              alt={comment.user?.name || "User"}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
            />
          ) : (
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-700 flex items-center justify-center">
              <span className="text-white text-sm sm:text-lg">
                {comment.user?.name?.charAt(0) || "A"}
              </span>
            </div>
          )}
        </div>
        <div className="flex-1 w-full min-w-0">
          <div className="bg-gray-800 rounded-lg p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <div>
                <p className="text-white font-medium text-sm sm:text-base">
                  {comment.user?.name || "Anonymous"}
                </p>
                <p className="text-xs text-gray-400">
                  {comment.createdAt &&
                    new Date(comment.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                </p>
              </div>
            </div>
            <p className="text-gray-300 text-sm sm:text-base mb-3">{comment.comment}</p>

            <div className="flex flex-wrap gap-3">
              {UserData && (
                <button
                  onClick={() => setShowReplyInput(!showReplyInput)}
                  className="text-xs sm:text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 sm:h-4 sm:w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {showReplyInput ? "Cancel Reply" : "Reply"}
                </button>
              )}
              <button
                onClick={toggleReplies}
                className="text-xs sm:text-sm text-gray-400 hover:text-white flex items-center gap-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 sm:h-4 sm:w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                {showReplies ? "Hide Replies" : "Show Replies"}
              </button>
            </div>
          </div>

          {showReplyInput && (
            <form onSubmit={handleSubmit(onSubmitReply)} className="mt-3">
              <textarea
                {...register("comment", { required: true })}
                className="w-full p-2 sm:p-3 bg-gray-700 text-white border border-gray-600 rounded-md resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                rows={2}
                placeholder="Write your reply..."
              />
              <div className="flex justify-end mt-2">
                <button
                  type="submit"
                  className="px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                >
                  Post Reply
                </button>
              </div>
            </form>
          )}

          {showReplies && (
            <div className="mt-3 sm:mt-4">
              {isLoadingReplies ? (
                <div className="flex items-center justify-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                </div>
              ) : replies && replies.length > 0 ? (
                <>
                  {replies.map((reply) => (
                    <CommentItem
                      key={reply.id}
                      comment={reply}
                      UserData={UserData}
                      onReply={onReply}
                      level={level + 1}
                    />
                  ))}

                  {replyTotalPages > 1 && (
                    <div className="flex flex-col sm:flex-row justify-between items-center mt-3 sm:mt-4 gap-2">
                      <button
                        onClick={handlePrevReplyPage}
                        className="px-2 py-1 sm:px-3 sm:py-1 text-xs sm:text-sm bg-gray-700 hover:bg-gray-800 text-white rounded-md disabled:opacity-50 transition-colors"
                        disabled={replyPage === 1}
                      >
                        Previous
                      </button>
                      <span className="text-xs sm:text-sm text-gray-400">
                        Page {replyPage} of {replyTotalPages}
                      </span>
                      <button
                        onClick={handleNextReplyPage}
                        className="px-2 py-1 sm:px-3 sm:py-1 text-xs sm:text-sm bg-gray-700 hover:bg-gray-800 text-white rounded-md disabled:opacity-50 transition-colors"
                        disabled={replyPage >= replyTotalPages}
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-gray-400 text-center py-3 sm:py-4 text-xs sm:text-sm">No replies yet</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Comments = ({
  UserData,
  ReviewData,
}: {
  UserData: any;
  ReviewData: any;
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [showInput, setShowInput] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { register, handleSubmit, reset } = useForm<{ comment: string }>();

  const { data, isLoading, isError, refetch } = useGetCommentsQuery(
    { reviewId: ReviewData.id, page, limit: 3 },
    { skip: !ReviewData.id }
  );

  useEffect(() => {
    if (data?.data) {
      // Filter out replies and organize comments
      const mainComments = data.data.filter(
        (comment: Comment) => !comment.parentId
      );
      const replies = data.data.filter((comment: Comment) => comment.parentId);

      // Attach replies to their parent comments
      const commentsWithReplies = mainComments.map((comment: Comment) => ({
        ...comment,
        replies: replies.filter(
          (reply: Comment) => reply.parentId === comment.id
        ),
      }));

      setComments(commentsWithReplies);
      if (data.meta) {
        setTotalPages(data.meta.totalPages);
      }
    }
  }, [data]);

  const [addComment] = useCreateCommentMutation();

  const onSubmitComment = async (formData: { comment: string }) => {
    if (!UserData?.id) {
      toast.error("User data not available");
      return;
    }

    const newComment = {
      reviewId: ReviewData.id,
      userId: UserData.id,
      comment: formData.comment,
      // parentId is omitted for main comments
    };

    try {
      const response = await addComment(newComment).unwrap();

      if (response?.data) {
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
            updatedAt: UserData.updatedAt,
          },
          replies: [],
        };

        setComments((prevComments) => [commentWithUser, ...prevComments]);
        reset();
        setShowInput(false);
        toast.success("Comment added successfully");
        refetch();
      } else {
        toast.error("Failed to add comment");
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
      toast.error("Error adding comment");
    }
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
      {!showInput && UserData && (
        <button
          onClick={() => setShowInput(true)}
          className="mb-4 px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
              clipRule="evenodd"
            />
          </svg>
          Add a comment
        </button>
      )}

      {showInput && (
        <form
          onSubmit={handleSubmit(onSubmitComment)}
          className="mb-4 space-y-2"
        >
          <textarea
            {...register("comment", { required: true })}
            className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded-md resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
            placeholder={
              !UserData
                ? "Please log in to comment..."
                : "Write your comment..."
            }
            disabled={!UserData}
          />
          <div className="flex justify-between items-center">
            <button
              type="submit"
              disabled={!UserData}
              className={`px-4 py-2 text-sm text-white rounded-md transition-colors ${UserData
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-600 cursor-not-allowed"
                }`}
            >
              {!UserData ? "Please Log In to Comment" : "Post Comment"}
            </button>
            <button
              type="button"
              onClick={() => setShowInput(false)}
              className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {isLoading ? (
        <div className="flex items-center justify-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
        </div>
      ) : isError ? (
        <p className="text-red-400">Error loading comments</p>
      ) : (
        <div className="text-sm text-gray-300 space-y-4">
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              UserData={UserData}
              onReply={() => { }}
            />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handlePrevPage}
            className="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-800 text-white rounded-md disabled:opacity-50 transition-colors"
            disabled={page === 1}
          >
            Previous
          </button>
          <span className="text-sm text-gray-400">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            className="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-800 text-white rounded-md disabled:opacity-50 transition-colors"
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
