import { baseApi } from "../../api/baseApi";

const discountApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllDiscounts: builder.query({
      query: () => ({
        url: "/discount",
        method: "GET",
      }),
      providesTags: ["discounts"],
    }),
    createDiscounts: builder.mutation({
      query: (data) => ({
        url: "/discount",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["discounts"],
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

export const { useCreateDiscountsMutation, useGetAllDiscountsQuery } =
  discountApi;
