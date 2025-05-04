"use client";
import React from "react";

import { Button } from "@/components/ui/button";

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
    <div className="bg-gradient-to-br bg-[#00031b] min-h-screen p-6 text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">🎬 My Watchlist</h1>
        {movieList.length > 0 && (
          <Button
            variant={"destructive"}
            onClick={() => handleWatchlistClear()}
            className="flex text-sm items-center gap-2 text-white"
          >
            <Trash2 size={20} /> Clear All
          </Button>
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
            <motion.div
              key={movie.id}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg relative"
            >
              <img
                src={movie?.thumbnail}
                alt={movie.title}
                className="w-full h-60 object-cover"
              />
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold mb-2">{movie?.title}</h3>
                  <h3 className="text-lg font-semibold mb-2">
                    {movie?.duration}
                  </h3>
                </div>
                <p className="text-sm text-gray-300 line-clamp-2">
                  {movie?.actress}
                </p>
                <Button
                  variant={"destructive"}
                  className="mt-3 text-sm flex items-center gap-1"
                  onClick={() => handleWatchlistDelete(movie.id)}
                >
                  <Trash2 size={16} />
                  Remove
                </Button>
              </CardContent>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WatchList;
