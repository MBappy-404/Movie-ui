import { baseApi } from "@/components/redux/api/baseApi";


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

        getPaymentWithVerify: builder.query({
          query: (tarnId) => ({
            url: `/payment/verify-payment?tran_id=${tarnId}`,
            method: "GET",
          }),
          providesTags: ["payment"],
        }),
        purchaseHistory: builder.query({
          query: () => ({
            url: `/payment/verify-payment`,
            method: "GET",
          }),
          providesTags: ["payment"],
        }),
         
      }),
   
});

export const {
   useGetAllPaymentsQuery,
   useCreatePaymentMutation,
   useGetPaymentWithVerifyQuery,
   usePurchaseHistoryQuery
} = paymentApi;
