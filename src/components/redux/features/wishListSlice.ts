import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  products: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
});

export default wishlistSlice.reducer;
