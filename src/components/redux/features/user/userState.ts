import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface UserState {
  user: {
    id: string;
    name: string;
    email: string;
    role: 'USER' | 'ADMIN';
    contactNumber: string;
    status: 'ACTIVE' | 'INACTIVE';
    profilePhoto?: string;
  } | null;
  token: string | null;
}

const initialState: UserState = {
  user: null,
  token: Cookies.get("accessToken") || null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      if (action.payload) {
        Cookies.set("accessToken", action.payload);
      } else {
        Cookies.remove("accessToken");
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      Cookies.remove("accessToken");
    },
  },
});

export const { setUser, setToken, logout } = userSlice.actions;
export default userSlice.reducer;
