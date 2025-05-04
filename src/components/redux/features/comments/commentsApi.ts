import { baseApi } from "../../api/baseApi";


const commentApi = baseApi.injectEndpoints({
    endpoints: (builder)=> ({
        createComment: builder.mutation({
            query: (data)=> ({
                url: "/comment",
                method: "POST",
                body: data
            }),
            invalidatesTags: ['comment']
        }),
        GetComments: builder.query({
            query: ({ reviewId, page, limit }) => {
              return {
                url: `/comment/nested/${reviewId}?page=${page}&limit=${limit}`,
                method: 'GET',
              };
            },
            providesTags: ['review'],
            // Optional: transform the response if needed
            // transformResponse: (response: any) => {
            //     return {
            //         data: response?.data,
            //     };
            // }
          })
    })
})

export const {
    useCreateCommentMutation,
    useGetCommentsQuery
} = commentApi