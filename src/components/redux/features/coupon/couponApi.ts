import { baseApi } from "../../api/baseApi";

const CouponApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCoupon: builder.query({
      query: () => ({
        url: "/coupon",
        method: "GET",
      }),
      providesTags: ["coupon"],
    }),
    createCoupon: builder.mutation({
      query: (data) => ({
        url: "/coupon",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["coupon"],
    }),
    deleteCoupon: builder.mutation({
      query: (id) => ({
        url: `/coupon/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["coupon"],
    }),
    validateCoupon: builder.mutation({
      query: (data) => ({
        url: "/coupon/validate",
        method: "POST",
        body: data,
      }),
    }),
    updateCoupon: builder.mutation({
      query: ({ id, data }) => ({
        url: `/coupon/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["coupon"],
    }),
  }),
});

export const {
  useCreateCouponMutation,
  useGetAllCouponQuery,
  useDeleteCouponMutation,
  useValidateCouponMutation,
} = CouponApi;
