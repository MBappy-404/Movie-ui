"use client"

import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { addToWatchList, removeFromWatchList, watchListSelector } from '../redux/features/watchListSlice';
import { toast } from 'sonner';

const WatchlistButton = ({ data } :any) => {
    const dispatch = useAppDispatch();
      const movieList = useAppSelector(watchListSelector);

  const handleToggleWatchlist = (data: any) => {
    // Here you can call your API to add/remove from watchlist
    const isExistInWatchList = movieList.some((item) => item.id === data.id);
    if(isExistInWatchList){
        toast.warning("Already Added Watchlist!");
        return
    }
    else{
        dispatch(addToWatchList(data));
        toast.success(" Watchlist Added Successfully! ");
    }
  };

  const isExistInWatchList = movieList.some((item) => item.id === data.id);

  return (
    <button
      onClick={()=> handleToggleWatchlist(data)}
      className={`px-4 py-2 rounded-full font-semibold shadow-md transition-all ${
        isExistInWatchList ? 'cursor-pointer rounded-xl text-white bg-red-500 shadow-md hover:opacity-90 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-red-500/40 text-sm duration-300' : 'cursor-pointer rounded-xl text-white bg-gradient-to-r from-blue-500 to-purple-500 shadow-md hover:opacity-90 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/40 text-sm duration-300'
      }`}
    >
      {isExistInWatchList ? 'Added Watchlist' : 'Add Watchlist '}
    </button>
  );
};

export default WatchlistButton;