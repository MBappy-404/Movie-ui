"use client";
import React from "react";

 

import { Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { Movie } from "@/types";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  clearWatchList,
  removeFromWatchList,
  watchListSelector,
} from "../redux/features/watchListSlice";
import { CardContent } from "../ui/card";
import { toast } from "sonner";
import Link from "next/link";

const WatchList = () => {
  const dispatch = useAppDispatch();
  const movieList = useAppSelector(watchListSelector);

  const handleWatchlistDelete = (id: string) => {
    dispatch(removeFromWatchList(id));
    toast.success("Movie deleted successfully form watchlist");
  };

  const handleWatchlistClear = () => {
    dispatch(clearWatchList());
    toast.success("Deleted all from watchlist");
  };

  return (
    <div className="bg-gradient-to-br bg-[#00031b] min-h-screen p-2 md:p-6 text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-lg md:text-3xl font-bold">🎬 My Watchlist</h1>
        {movieList.length > 0 && (
          <button
          
            onClick={() => handleWatchlistClear()}
            className="flex text-sm items-center gap-2 cursor-pointer bg-white/10   hover:bg-white/10 px-3 rounded-lg py-2 text-white"
          >
            <Trash2 size={15} /> Clear All
          </button>
        )}
      </div>

      {movieList.length === 0 ? (
        <div className="text-center mt-20">
          <h2 className="text-xl">Your watchlist is empty 🍿</h2>
          <p className="text-gray-400 mt-2">
            Start adding some movies to enjoy later!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {movieList.map((movie: Movie) => (
            <Link key={movie.id} href={`/movies/${movie.id}`}>
              <div className="group cursor-pointer relative bg-white/5 rounded-2xl border border-white/10 overflow-hidden hover:border-white/20 transition-all">
                <div className="relative">
                  <img
                    src={movie.thumbnail}
                    alt={movie.title}
                    className="w-full h-80 object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-300">
                          {movie.genre?.genreName}
                        </span>
                        <div className="flex items-center gap-1 text-yellow-400">
                          <svg
                            className="w-4 h-4 fill-current"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span>{movie.averageRating}</span>
                        </div>
                      </div>
                      <div className="h-1 bg-white/10 rounded-full">
                        <div
                          className="h-full bg-yellow-500 rounded-full transition-all duration-500"
                          style={{
                            width: `${
                              ((movie?.averageRating as number) / 10) * 100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-100">
                    {movie.title}
                  </h3>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(),
                        e.preventDefault(),
                        handleWatchlistDelete(movie.id);
                    }}
                    className="mt-4 cursor-pointer w-full py-2 text-sm font-medium bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    Remove from Watchlist
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default WatchList;
