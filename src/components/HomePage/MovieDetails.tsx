"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import moviePoster from "@/assets/images/movieposter.jpg";
import manvector from "@/assets/images/manvector.png";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import ReactPlayer from "react-player";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useParams } from "next/navigation";
import {
  useGetAllContentQuery,
  useGetContentQuery,
} from "../redux/features/content/contentApi";
import MovieDetailsSkeleton from "../Movies/MovieDetailsSkeleton";
import { useGetUserQuery } from "../redux/features/user/userApi";
import {
  useCreateReviewMutation,
  useGetAllReviewByContentIdQuery,
  useGetAllReviewQuery,
} from "../redux/features/review/reviewApi";
import { toast } from "sonner";
import Link from "next/link";
import ReviewCard from "../modules/Reviews/ReviewCard";

interface Movie {
  id: string;
  title: string;
  thumbnail: string;
  genre: {
    genreName: string;
  };
  releaseYear: string;
  duration: string;
}

interface ReviewFormData {
  rating: number;
  reviewText: string;
  tags: string;
}

const MovieDetails = ({ currentUser }: any) => {
  const router = useRouter();
  const { id } = useParams();

  const { data: movieDetails, isLoading } = useGetContentQuery(id);
  const { data: allMovies, isLoading: isMoviesLoading } =
    useGetAllContentQuery(undefined);
  const { data: SingleUser } = useGetUserQuery(currentUser?.id);

  const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);
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
      const currentGenre = movieDetails.data.genre?.genreName;
      console.log("Current Genre:", currentGenre);

      if (currentGenre) {
        const filteredMovies = allMovies.data
          .filter((movie: Movie) => {
            console.log(
              "Checking movie:",
              movie.title,
              "Genre:",
              movie.genre?.genreName
            );
            return (
              movie.genre?.genreName === currentGenre &&
              movie.id !== movieDetails.data.id
            );
          })
          .slice(0, 4);

        console.log("Filtered Movies:", filteredMovies);
        setRecommendedMovies(filteredMovies);
      } else {
        console.log("No current genre found");
        setRecommendedMovies([]);
      }
    } else {
      console.log("No movies data available");
      setRecommendedMovies([]);
    }
  }, [allMovies, movieDetails]);

  const [rating, setRating] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const videoUrl =
    "https://customer-342mt1gy0ibqe0dl.cloudflarestream.com/e5fe3013604cf504ace84b84d91b1f5a/downloads/default.mp4";

  if (isLoading) {
    return <MovieDetailsSkeleton />;
  }

  const onSubmit = async (data: ReviewFormData) => {
    const toastId = toast.loading("Adding Review...");
    if (!SingleUser?.data?.id) {
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
        userId: SingleUser.data.id,
        tags: data.tags || "CLASSIC", // Provide a default value if tags is undefined
      };

      const res = await addReview(reviewData).unwrap();

      if (res?.success) {
        toast.success(res?.message || "Your review is Pending", {
          id: toastId,
        });
        reset();
        setRating(0);
        setIsChecked(false);
        setSubmitted(true);
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

  return (
    <div className="min-h-screen container mx-auto text-white p-6 pt-24">
      {/* 🎬 Trial Video Section */}
      <div className="w-full  mb-10 hidden md:block">
        <div className="relative w-full   rounded-xl overflow-hidden">
          <Image
            src={movieDetails?.data?.contentBanner}
            alt="Banner"
            width={600}
            height={400}
            className="w-full h-full object-cover rounded-xl"
          />
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
          <div className="flex justify-between mt-4">
            <button className="text-sm text-gray-400 hover:text-white cursor-pointer">
              👍 0 likes
            </button>
            <button className="text-sm text-gray-400 hover:text-white cursor-pointer">
              🔗 Share
            </button>
            <button className="text-sm text-gray-400 hover:text-white cursor-pointer">
              ⭐ Watchlist
            </button>
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
          <p className="text-sm md:text-lg text-gray-400 mb-2 flex gap-1 items-center">
            <Rating
              style={{ maxWidth: 80 }}
              value={movieDetails?.data?.averageRating}
              onChange={movieDetails?.data?.averageRating}
              readOnly
            />{" "}
            {movieDetails?.data?.averageRating} | 📅{" "}
            {movieDetails?.data?.releaseYear} | ⏱️{" "}
            {movieDetails?.data?.duration} |{" "}
            <span>
              <Image
                src={movieDetails?.data?.platform?.platformLogo}
                width={20}
                height={20}
                alt="sds"
              />
            </span>{" "}
            {movieDetails?.data?.platform?.platformName}
          </p>
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
            <p className="text-sm md:text-lg font-semibold text-gray-400">
              One Time Purchase :
              <span className="text-white text-xl">
                {" "}
                ${movieDetails?.data?.price}
              </span>
            </p>
            <p className="text-sm md:text-lg font-semibold text-gray-400">
              Rental Price:
              <span className="text-white text-xl">
                {" "}
                ${movieDetails?.data?.rentprice}
              </span>
            </p>
          </div>

          <div className="py-5">
            <button className="px-6 py-3 mt-5 cursor-pointer flex gap-2 items-center rounded-xl font-bold text-white bg-gradient-to-r from-blue-500 to-purple-500 shadow-md hover:opacity-90 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/40 text-sm md:text-lg   duration-300">
              Purchase Movie
            </button>
          </div>

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
              disabled={!SingleUser?.data?.id || rating === 0}
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
