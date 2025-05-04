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
        // createGenre: builder.mutation({
        //   query: (data) => ({
        //     url: "/genre",
        //     method: "POST",
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

export const {
   useGetAllPaymentsQuery
} = paymentApi;
