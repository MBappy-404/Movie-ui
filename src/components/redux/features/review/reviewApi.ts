import { baseApi } from "../../api/baseApi"


const reviewApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createReview: builder.mutation({
            query: (data) => ({
                url: "/reviews",
                method: "POST",
                body: data
            }),
            invalidatesTags: ['review']
        }),

        getAllReview: builder.query({
            query: (args) => {
      
              return {
                url: "/reviews",
                method: "GET",
              };
            },
            providesTags: ["review"],
          }),
    })
})

export const {
    useCreateReviewMutation,
    useGetAllReviewQuery
} = reviewApi