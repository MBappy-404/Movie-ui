import { Movie } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface IinitialState {
  movieList: Movie[];
}
const initialState: IinitialState = {
  movieList: [],
};

const watchListSlice = createSlice({
  name: "watchList",
  initialState,
  reducers: {
    addToWatchList: (state, action) => {
      const movie = action.payload;
      const existingMovie = state.movieList.find(
        (item) => item.id === movie.id
      );
      if (!existingMovie) {
        state.movieList.push(movie);
      }
    },
    removeFromWatchList: (state, action) => {
      const movieId = action.payload;
      state.movieList = state.movieList.filter((item) => item.id !== movieId);
    },
    clearWatchList: (state) => {
      state.movieList = [];
    },
  },
});

export const watchListSelector = (state: RootState) =>
  state.watchList.movieList;
export const { addToWatchList, removeFromWatchList, clearWatchList } =
  watchListSlice.actions;
export default watchListSlice.reducer;
