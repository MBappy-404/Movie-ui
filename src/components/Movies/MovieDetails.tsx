"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useParams } from "next/navigation";
import {
  useGetAllContentQuery,
  useGetContentQuery,
} from "../redux/features/content/contentApi";
import MovieDetailsSkeleton from "./MovieDetailsSkeleton";
import { useGetUserQuery } from "../redux/features/user/userApi";
import {
  useCreateReviewMutation,
  useGetAllReviewByContentIdQuery,
} from "../redux/features/review/reviewApi";
import { toast } from "sonner";
import Link from "next/link";
import ReviewCard from "../modules/Reviews/ReviewCard";
import { useCreatePaymentMutation } from "../redux/features/payment/paymentApi";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  addToWatchList,
  watchListSelector,
} from "../redux/features/watchListSlice";
import { Movie } from "@/types";
import { verifyToken } from "@/utils/verifyToken";
import { selectCurrentToken } from "../redux/features/auth/authSlice";
import { TMovie } from "../types/movie";
import WatchlistButton from "../Shared/WatchlistButton";

interface ReviewFormData {
  rating: number;
  reviewText: string;
  tags: string;
}

const MovieDetails = () => {
  const [createPayment] = useCreatePaymentMutation();
  const [showModal, setShowModal] = useState(false);

  const movieList = useAppSelector(watchListSelector);

  // const dispatch = useAppDispatch();

  // const handleWatchlist = (data: Movie) => {
  //   const isExistInWatchList = movieList.some((item) => item.id === data.id);

  //   if (isExistInWatchList) {
  //     toast.warning("Already Added to Watchlist");
  //     return;
  //   }

  //   dispatch(addToWatchList(data));
  //   toast.success("Added to Watchlist", {
  //     icon: "⭐",
  //   });
  // };

  const router = useRouter();
  const { id } = useParams();
  const token = useAppSelector(selectCurrentToken);
  let user: any;
  if (token) {
    user = verifyToken(token);
  }

  const { data: movieDetails, isLoading } = useGetContentQuery(id);
  console.log(movieDetails);

  const { data: allMovies, isLoading: isMoviesLoading } =
    useGetAllContentQuery(undefined);
  const { data: SingleUser } = useGetUserQuery(user?.id);

  const [recommendedMovies, setRecommendedMovies] = useState<TMovie[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReviewFormData>();
  const [addReview] = useCreateReviewMutation();
  const contentId = movieDetails?.data.id;

  const { data: allReview } = useGetAllReviewByContentIdQuery(contentId);

  useEffect(() => {
    if (allMovies?.data && movieDetails?.data) {
      const currentGenre = movieDetails?.data?.genre?.genreName;
      // console.log("Current Genre:", currentGenre);

      if (currentGenre) {
        // First try to find exact genre matches
        let filteredMovies = allMovies?.data?.filter((movie: TMovie) => {
          return (
            movie?.genre?.genreName === currentGenre &&
            movie?.id !== movieDetails?.data?.id
          );
        });

        // If we don't have enough movies with exact genre match, try to find similar genres
        if (filteredMovies.length < 4) {
          const similarGenres = allMovies?.data?.filter((movie: TMovie) => {
            // Exclude the current movie and already filtered movies
            return (
              movie.id !== movieDetails?.data?.id &&
              !filteredMovies?.some((fm: TMovie) => fm.id === movie?.id) &&
              movie.genre?.genreName
            );
          });

          // Add similar genre movies until we have 4 recommendations
          filteredMovies = [
            ...filteredMovies,
            ...similarGenres.slice(0, 4 - filteredMovies.length),
          ];
        }

        // Ensure we only show 4 recommendations
        filteredMovies = filteredMovies.slice(0, 4);
        // console.log("Recommended Movies:", filteredMovies);
        setRecommendedMovies(filteredMovies);
      } else {
        // console.log("No current genre found");
        setRecommendedMovies([]);
      }
    } else {
      // console.log("No movies data available");
      setRecommendedMovies([]);
    }
  }, [allMovies, movieDetails]);

  const [rating, setRating] = useState(0);

  if (isLoading) {
    return <MovieDetailsSkeleton />;
  }

  const onSubmit = async (data: ReviewFormData) => {
    const toastId = toast.loading("Adding Review...");
    if (!user.id) {
      toast.error("User information not available. Please try again later.", {
        id: toastId,
      });
      return;
    }

    try {
      const reviewData = {
        rating: rating,
        reviewText: data.reviewText,
        contentId: movieDetails.data.id,
        userId: user.id,
        tags: data.tags || "CLASSIC", // Provide a default value if tags is undefined
      };

      const res = await addReview(reviewData).unwrap();

      if (res?.success) {
        toast.success(res?.message || "Your review is Pending", {
          id: toastId,
        });
        reset();
        setRating(0);
      } else {
        toast.error(res?.message || "Failed to add review", { id: toastId });
      }
    } catch (error: any) {
      console.error("Review submission error:", error);
      toast.error(error?.data?.message || "Something went wrong", {
        id: toastId,
      });
    }
  };

  // Purchasing
  const handleOptionSelect = async (data: Movie, option: string) => {
    if (!user) {
      router.push("/login"); // redirect to login page
    } else {
      const toastId = toast.loading("Loading Payment Page...");
      // console.log(data)
      const paymentData = {
        contentId: data?.id,
        status: option,
      };

      const payment = await createPayment(paymentData);
      // console.log(payment?.data?.paymentUrl);
      if (payment?.data?.success) {
        toast.success("Redirecting to payment page...", { id: toastId });
      } else {
        toast.error("Failed to create payment", { id: toastId });
      }
      setShowModal(false);
      window.open(payment?.data?.data?.paymentUrl);
    }
  };

  return (
    <div className="min-h-screen container mx-auto text-white p-6 pt-24">
      {/* 🎬 Trial Video Section */}

      <div className="w-full  mb-10 hidden md:block">
        <div className="relative w-full   rounded-xl overflow-hidden">
          {typeof movieDetails?.data?.contentBanner === "string" &&
          movieDetails.data.contentBanner.trim() !== "" &&
          (movieDetails.data.contentBanner.startsWith("http") ||
            movieDetails.data.contentBanner.startsWith("https") ||
            movieDetails.data.contentBanner.startsWith("/")) ? (
            <Image
              src={movieDetails.data.contentBanner}
              alt="Banner"
              width={600}
              height={400}
              className="w-full h-full object-cover rounded-xl"
            />
          ) : null}
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-start gap-8">
        <motion.div
          className="w-full md:w-1/4"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Image
            src={movieDetails?.data?.thumbnail}
            alt="Spider Man Memo Poster"
            width={600}
            height={400}
            className="rounded-xl"
          />
          <div className="flex justify-center mt-4 ">
            <WatchlistButton data={movieDetails.data} />
          </div>
        </motion.div>

        <motion.div
          className="w-full md:w-3/4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold mb-2">
            {movieDetails?.data?.title}
          </h1>

          <div className="text-sm md:text-lg text-gray-400 mb-2 flex md:flex-row lg:flex-row flex-col gap-1 lg:items-center ">
            <div className="flex gap-1">
            <Rating
              style={{ maxWidth: 80 }}
              value={movieDetails?.data?.averageRating}
              onChange={movieDetails?.data?.averageRating}
              readOnly
            />{" "}
            <p>{movieDetails?.data?.averageRating} | {" "}</p>
            <div className="flex gap-1">
            📅
            <p>{movieDetails?.data?.releaseYear} | </p>
            </div>
            </div>
            
            <div className="flex gap-1">
            ⏱️{" "}
            <p>{movieDetails?.data?.duration} |{" "}</p>
            <span className="flex gap-1">
              <Image
                src={movieDetails?.data?.platform?.platformLogo}
                width={20}
                height={20}
                alt="sds"
              />
               {movieDetails?.data?.platform?.platformName}
            </span>{" "}
            </div>
            
           
          </div>

          <p className="mb-4 text-sm md:text-lg text-gray-300">
            {movieDetails?.data?.genre?.genreName}
          </p>
          <p className="mb-4 text-sm md:text-lg text-gray-300">
            {movieDetails?.data?.synopsis}
          </p>
          <div className="space-y-3">
            <div className="flex gap-2">
              <p className="text-sm md:text-lg text-gray-400">
                Cast:{" "}
                <span className="text-white">{movieDetails?.data?.actor},</span>
              </p>
              <p className="text-sm md:text-lg text-gray-400">
                <span className="text-white">
                  {movieDetails?.data?.actress}
                </span>
              </p>
            </div>
            <p className="text-sm md:text-lg text-gray-400">
              Producer:{" "}
              <span className="text-white">
                {" "}
                {movieDetails?.data?.producer}
              </span>
            </p>
            <p className="text-sm md:text-lg text-gray-400">
              Director:{" "}
              <span className="text-white">{movieDetails?.data?.director}</span>
            </p>
            {movieDetails?.data?.spoilerWarning && (
              <p className="text-sm md:text-lg text-gray-400">
                Spoiler Warning:{" "}
                <span className="text-white">
                  {movieDetails?.data?.spoilerWarning}
                </span>
              </p>
            )}

{(() => {
  const discount = movieDetails?.data?.discount;
  const price = movieDetails?.data?.price;

  if (!discount || !price) return null;

  const today = new Date();
  const startDate = new Date(discount.startDate);
  const endDate = new Date(discount.endDate);

  // Normalize all dates to 00:00 so we can compare only the date
  today.setHours(0, 0, 0, 0);
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);

  const isDiscountActive =
    today.getTime() === startDate.getTime() || // aaj start
    today.getTime() === endDate.getTime() ||   // aaj end
    today.getTime() < endDate.getTime();       // aaj end er age

  return (
    <>
      {isDiscountActive && (
        <p className="text-sm md:text-lg text-gray-400">
          Discount Left:
          <span className="text-white ml-1">
            {discount.endDate?.slice(0, 10)}
          </span>
        </p>
      )}

      <p className="text-sm md:text-lg font-semibold text-gray-400">
        One Time Purchase:
        {discount.isActive && isDiscountActive ? (
          <>
            <span className="text-white font-bold ml-2 text-xl">
              ${(
                price -
                (price * discount.percentage) / 100
              ).toFixed(2)}
            </span>
            <del className="ml-2 text-red-400">${price}</del>
          </>
        ) : (
          <span className="text-white font-bold ml-2 text-xl">
            ${price}
          </span>
        )}
      </p>
    </>
  );
})()}



            <p className="text-sm md:text-lg font-semibold text-gray-400">
              Rental Price:
              <span className="text-white text-xl">
                {" "}
                ${movieDetails?.data?.rentprice}
              </span>
            </p>
          </div>

          <div className="py-5">
            <button
              onClick={() => setShowModal(true)}
              className="px-5 py-2 mt-5 cursor-pointer flex gap-2 items-center rounded-xl font-medium text-white bg-gradient-to-r from-blue-500 to-purple-500 shadow-md hover:opacity-90 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/40 text-sm md:text-lg   duration-300"
            >
              Purchase Movie
            </button>
          </div>

          {showModal && (
            <div className="fixed inset-0 z-50 bg-black/20  backdrop-blur-xl flex items-center justify-center">
              <div className="bg-gray-800 rounded-xl shadow-lg p-6 w-80 text-center">
                {movieDetails?.data?.discount?.isActive && (
                  <div className="bg-red-500 absolute  -translate-y-9  text-white px-3 rounded-full">
                    <span className=" ml-2">
                      {movieDetails?.data?.discount?.percentage}% Off For On
                      Time Purchase
                    </span>
                  </div>
                )}
                <h2 className="text-lg md:text-2xl font-semibold mb-4">
                  Choose an option
                </h2>
                <div className="flex flex-col gap-4">
                  <button
                    onClick={() =>
                      handleOptionSelect(movieDetails?.data, "BOUGHT")
                    }
                    className="py-2 px-4 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Buy On Time{" "}
                    <span>
                      {movieDetails?.data?.price &&
                      movieDetails?.data?.discount
                        ? (
                            movieDetails.data.price -
                            (movieDetails.data.price *
                              movieDetails.data.discount?.percentage) /
                              100
                          ).toFixed(2)
                        : movieDetails?.data?.price}
                    </span>{" "}
                    USD
                  </button>
                  <button
                    onClick={() =>
                      handleOptionSelect(movieDetails?.data, "RENTED")
                    }
                    className="py-2 px-4 bg-purple-600 cursor-pointer text-white rounded-lg hover:bg-purple-700 transition"
                  >
                    Rent {movieDetails?.data?.rentprice} USD
                  </button>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="mt-4 text-lg cursor-pointer text-gray-500 hover:underline"
                >
                  Not Now
                </button>
              </div>
            </div>
          )}

          <h2 className="mt-8 text-xl font-semibold text-white">
            Recommended For You
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {recommendedMovies.map((movie) => (
              <Link key={movie.id} href={`/movies/${movie.id}`}>
                <motion.div
                  key={movie.id}
                  className="relative w-full h-64 bg-gray-900 rounded-lg overflow-hidden shadow-lg cursor-pointer"
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                >
                  <img
                    src={movie.thumbnail}
                    alt={movie.title}
                    className="w-full h-40 object-cover"
                  />

                  <div className="p-2 h-16 flex items-center">
                    <h3 className="text-white text-sm font-semibold line-clamp-2">
                      {movie.title}
                    </h3>
                  </div>

                  <motion.div
                    variants={{
                      rest: { x: "100%", opacity: 0 },
                      hover: { x: "0%", opacity: 1 },
                    }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 bg-[#0f172a] text-white p-4 flex flex-col justify-center pointer-events-none"
                  >
                    <div>
                      <h3 className="text-lg font-semibold">{movie.title}</h3>

                      <p className="text-sm md:text-lg text-gray-400 mt-1">
                        {movie.releaseYear} ・ {movie.duration}
                      </p>
                      <p className="text-sm md:text-lg mt-2 text-gray-300">
                        {movie.genre.genreName}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              </Link>
            ))}
          </div>

          <h2 className="mt-10 text-xl font-semibold">Add a review</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
            {/* Rating Component */}
            <Rating
              style={{ maxWidth: 180 }}
              value={rating}
              onChange={setRating}
            />

            {/* Review Textarea */}
            <textarea
              className="w-full mt-4 p-2 outline-none focus:border-blue-500 transition-all duration-300  bg-gray-800 border border-gray-600 rounded"
              rows={4}
              placeholder="Your review *"
              {...register("reviewText", { required: "Review is required" })}
            />
            <select
              className="mt-4 p-2 text-white border border-gray-500 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              {...register("tags")}
            >
              <option className="bg-slate-900 text-white" value="CLASSIC">
                CLASSIC
              </option>
              <option className="bg-slate-900 text-white" value="UNDERRATED">
                UNDERRATED
              </option>
            </select>
            {errors.reviewText && (
              <p className="text-red-500 text-sm mt-1">
                {errors.reviewText.message}
              </p>
            )}

            {/* Checkbox for saving info */}

            {/* <div className="mt-4">
 
              <label className="text-sm">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                />
                Save my name, email, and website in this browser for the next
                time I comment.
              </label>
 
            </div> */}

            {/* Submit Button */}
            <br />
            <button
              type="submit"
              disabled={!user?.id || !SingleUser?.data?.id || rating === 0}
              className="mt-4 px-10 py-3 cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg shadow-lg hover:-translate-y-1 hover:shadow-blue-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {!SingleUser?.data?.id ? "Loading user data..." : "Submit"}
            </button>
          </form>

          {/* Display Submitted Review */}
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">User Reviews</h2>

            <ReviewCard ReviewData={allReview} UserData={SingleUser?.data} />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MovieDetails;
