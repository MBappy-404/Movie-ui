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
            query: () => {
      
              return {
                url: "/reviews",
                method: "GET",
              };
            },
            providesTags: ["review"],
            // transformResponse: (response: any) => {
            //     return {
            //         data: response?.data,
            //     }
            // }
          }),
          getAllReviewByContentId: builder.query({
            query: (contentId) => {
      
              return {
                url: `/reviews/${contentId}`,
                method: "GET",
              };
            },
            providesTags: ["review"],
            // transformResponse: (response: any) => {
            //     return {
            //         data: response?.data,
            //     }
            // }
          }),

    })
})

export const {
    useCreateReviewMutation,
    useGetAllReviewQuery,
    useGetAllReviewByContentIdQuery
} = reviewApi