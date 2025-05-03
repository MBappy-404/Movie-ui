// services/baseApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";  

const baseQuery = fetchBaseQuery({
  baseUrl: `https://movie-server-api.vercel.app/api`,
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = Cookies.get("accessToken"); 

    if (token) {
      headers.set("authorization", `${token}`);
    }

    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  tagTypes: ['content', 'user', 'review'],
  endpoints: () => ({}),
});
