import { baseApi } from "@/components/redux/api/baseApi";


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
            transformResponse: (response: any) => {
                return {
                    data: response?.data || [],
                };
            },
            providesTags: ["review"],
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

        updateReview: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/reviews/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["review"],
        }),

        deleteReview: builder.mutation({
            query: (id) => ({
                url: `/reviews/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['review']
        }),
    })
});

export const {
    useCreateReviewMutation,
    useGetAllReviewQuery,
    useGetAllReviewByContentIdQuery,
    useUpdateReviewMutation,
    useDeleteReviewMutation
} = reviewApi