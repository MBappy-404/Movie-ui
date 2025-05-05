import { baseApi } from "../../api/baseApi";

const paymentApi = baseApi.injectEndpoints({
  

    endpoints: (builder) => ({
        getAllPayments: builder.query({
          query: () => ({
            url: "/payment",
            method: "GET",
          }),
          providesTags: ["payment"],
        }),
        createPayment: builder.mutation({
          query: (data) => ({
            url: "/payment/init-payment",
            method: "POST",
            body: data,
          }),
          invalidatesTags: ["payment"],
        }),
        // deleteGenre: builder.mutation({
        //   query: (genreId) => ({
        //     url: `/genre/${genreId}`,
        //     method: "DELETE",
        //   }),
        //   invalidatesTags: ["genres"],
        // }),
      }),
   
});

export const {
   useGetAllPaymentsQuery,
   useCreatePaymentMutation
} = paymentApi;
