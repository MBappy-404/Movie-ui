import { baseApi } from "../../api/baseApi";

const subscribersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSubscribers: builder.query({
      query: () => ({
        url: "/newsletter/subscribers",
        method: "GET",
      }),
      providesTags: ["subscribers"],
    }),
    createSubscriber: builder.mutation({
      query: (data) => ({
        url: "/newsletter/subscribe",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["subscribers"],
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

export const { useGetAllSubscribersQuery, useCreateSubscriberMutation } =
  subscribersApi;
