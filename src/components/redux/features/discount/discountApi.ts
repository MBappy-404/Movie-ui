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
    getActiveDiscount: builder.query({
      query: ()=> ({
        url: "/discount/active",
        method: "GET",
      }),
    }),

    createDiscounts: builder.mutation({
      query: (data) => ({
        url: "/discount",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["discounts"],
    }),
    updateDiscount: builder.mutation({
      query: ({ discountId, data }) => ({
        url: `/discount/${discountId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["discounts"],
    }),
    deleteDiscount: builder.mutation({
      query: (discountId) => ({
        url: `/discount/${discountId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["discounts"],
    }),
  }),
});

export const { useCreateDiscountsMutation, useGetAllDiscountsQuery, useGetActiveDiscountQuery, useDeleteDiscountMutation, useUpdateDiscountMutation } =
  discountApi;
