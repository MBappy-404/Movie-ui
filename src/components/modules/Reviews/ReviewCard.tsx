"use client";

import { useGetUserQuery } from "@/components/redux/features/user/userApi";
import { Rating } from "@smastrom/react-rating";
import Image from "next/image";
import React, { useState } from "react";
import Comments from "../Comment/Comments";
import { useAppSelector } from "@/components/redux/hooks";
import { selectCurrentToken } from "@/components/redux/features/auth/authSlice";
import { verifyToken } from "@/utils/verifyToken";
import { TUser } from "@/components/types/user";
import { ThumbsUpIcon } from "lucide-react";
import { MdThumbUp } from "react-icons/md";
import {
  useAddLikeOrDislikeMutation,
  useGetLikesOrDislikesCountQuery,
} from "@/components/redux/features/likes/likesApi";
import {
  useDeleteReviewMutation,
  useUpdateReviewMutation,
} from "@/components/redux/features/review/reviewApi";
import { toast } from "sonner";
import DeletePendingReviewModal from "@/components/modals/DeletePendingReviewModal";

// Separate component for individual review items
const ReviewItem = ({ item, UserData }: { item: any; UserData: any }) => {
  const [liked, setLiked] = useState(false);
  const [addLikeOrDislike] = useAddLikeOrDislikeMutation();
  const { data: likeOrDislikeCounts, isLoading } =
    useGetLikesOrDislikesCountQuery({
      reviewId: item.id,
    });
  const date = new Date(item.createdAt);

  const likes = likeOrDislikeCounts?.data?.likeCount;
  const dislikes = likeOrDislikeCounts?.data?.dislikeCount;
  const IsLikesOrDislikeStatus =
    likeOrDislikeCounts?.data?.currentUserLikeStatus;

  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleAddLikeOrDislike = async (passedStatus: string) => {
    let status;

    if (passedStatus === "LIKED") {
      status = "LIKED";
    } else if (passedStatus === "DISLIKED") {
      status = "DISLIKED";
    }

    const addLikeOrDislikeData = {
      userId: UserData.id,
      reviewId: item.id,
      status,
    };

    try {
      const res = await addLikeOrDislike(addLikeOrDislikeData);
      // console.log(res);
      if ("error" in res && res.error) {
        const errorMessage =
          (res.error as any)?.data?.message || "An error occurred";
        //console.log(errorMessage);
      } else {
        //console.log(res?.data?.message);
      }
    } catch (error: any) {
      //console.log(error.data.message);
    }
  };

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
            {item.user?.name || "Anonymous"}
          </p>
          <p className="mt-2 text-gray-300 text-sm">{item.reviewText}</p>
          <div className="flex gap-x-5 translate-y-5">
            <button
              onClick={() => handleAddLikeOrDislike("LIKED")}
              // onClick={() => setLiked(!liked)}
              className=" top-2 left-2  cursor-pointer flex gap-2 items-center   transition"
            >
              {IsLikesOrDislikeStatus === "LIKED" ? (
                <MdThumbUp className="h-6 w-6" />
              ) : (
                <ThumbsUpIcon
                  className="h-6 w-6"
                  // className={`h-7 w-7 ${
                  //   liked ? "text-blue-500" : "text-gray-500"
                  // } hover:scale-110 rotate-180`}
                />
              )}

              {isLoading ? <span>Pending..</span> : <span>{likes}</span>}
            </button>
            <button
              onClick={() => handleAddLikeOrDislike("DISLIKED")}
              // onClick={() => setLiked(!liked)}
              className=" top-2 cursor-pointer left-2 flex gap-2  items-center transition"
            >
              {IsLikesOrDislikeStatus === "DISLIKED" ? (
                <MdThumbUp className="h-6 w-6 rotate-180" />
              ) : (
                <ThumbsUpIcon
                  className="h-6 w-6 rotate-180 translate-y-1"
                  // className={`h-7 w-7 ${
                  //   liked ? "text-blue-500" : "text-gray-500"
                  // } hover:scale-110 rotate-180`}
                />
              )}

              <span>{dislikes}</span>
            </button>
          </div>
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
  const token = useAppSelector(selectCurrentToken);
  let userinfo: any;
  if (token) {
    userinfo = verifyToken(token);
  }

  // console.log(userinfo);
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [editedText, setEditedText] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);
  const [updateReview] = useUpdateReviewMutation();

  const publishedReviews = ReviewData?.data?.filter(
    (item: any) => item.status === "PUBLISHED"
  );
  const pendingReviews = ReviewData?.data?.filter(
    (item: any) => item.status === "PENDING" && item?.userId === userinfo?.id
  );

  const handleEdit = (item: any) => {
    setEditingReviewId(item.id);
    setEditedText(item.reviewText);
  };

  const handleCancel = () => {
    setEditingReviewId(null);
    setEditedText("");
  };

  const handleSave = async (id: string) => {
    const toastId = toast.loading("Updating Review....", { duration: 2000 });
    // 🔁 Send updated review to backend here
    // console.log("Saving:", id, editedText);

    const updateReviewData = {
      id,
      reviewText: editedText,
    };

    try {
      const res = await updateReview(updateReviewData).unwrap();
      toast.success("Review updated successfully!", { id: toastId });
      setEditingReviewId(null);
    } catch (error: any) {
      toast.error(error.message || "Failed to update review", { id: toastId });
      setEditingReviewId(null);
    }
  };

  const isUser = userinfo && pendingReviews?.length > 0;
  return (
    <div>
      {isUser && (
        <h1 className="text-lg font-semibold text-yellow-500">
          Your Pending Reviews: {pendingReviews?.length}{" "}
        </h1>
      )}
      {isUser && (
        <div className="bg-gray-900 rounded-lg p-6 mb-5 shadow-md flex flex-col gap-6">
          {pendingReviews?.map((item: any) => (
            <div key={item.id} className="relative p-4 rounded-md">
              {/* Pending Tag */}

              {/* Review Content */}
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
                    <Rating
                      style={{ maxWidth: 80 }}
                      value={item.rating}
                      readOnly
                    />
                  </div>
                  <div className="bg-gray-800 p-3 rounded-xl mt-2 max-w-[300px] md:max-w-[400px] whitespace-pre-wrap break-all relative">
                    {/* Action Buttons */}
                    <div className="absolute top-2 right-2 flex gap-2">
                      {editingReviewId === item.id ? (
                        <>
                          <button
                            onClick={() => handleSave(item.id)}
                            className="text-sm text-green-400 hover:text-green-600"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancel}
                            className="text-sm text-yellow-400 hover:text-yellow-600"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEdit(item)}
                            className="text-sm text-blue-400 hover:text-blue-600 cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              setReviewToDelete(item);
                              setIsDeleteModalOpen(true);
                            }}
                            // onClick={() => handleDelete(item.id)}
                            className="text-sm text-red-400 hover:text-red-600 cursor-pointer"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>

                    {/* Review Content or Editable Field */}
                    <p className="font-semibold text-white mt-1">
                      {item.user?.name || "Anonymous"}
                    </p>
                    {editingReviewId === item.id ? (
                      <textarea
                        className="mt-2 text-sm w-full border border-gray-500 outline-none focus:border-blue-600 p-2 rounded bg-gray-700 text-white"
                        rows={3}
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                      />
                    ) : (
                      <p className="mt-2 text-gray-300 text-sm">
                        {item.reviewText}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
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

      <DeletePendingReviewModal
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        reviewToDelete={reviewToDelete}
        setReviewToDelete={setReviewToDelete}
      />
    </div>
  );
};

export default ReviewCard;
