import { baseApi } from "@/components/redux/api/baseApi";

const genreApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLikesOrDislikesCount: builder.query({
      query: ({ reviewId }) => ({
        url: `/like/${reviewId}`,
        method: "GET",
      }),
      providesTags: ["likes"],
    }),
    addLikeOrDislike: builder.mutation({
      query: (data) => ({
        url: "/like",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["likes"],
    }),
    // updateGenre: builder.mutation({
    //   query: ({ genreIdId, data }) => ({
    //     url: `/genre/${genreIdId}`,
    //     method: "PATCH",
    //     body: data,
    //   }),
    //   invalidatesTags: ["genres"],
    // }),
    // deleteGenre: builder.mutation({
    //   query: (genreId) => ({
    //     url: `/genre/${genreId}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["genres"],
    // }),
  }),
});

export const { useAddLikeOrDislikeMutation, useGetLikesOrDislikesCountQuery } =
  genreApi;
