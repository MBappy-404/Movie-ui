import { baseApi } from "@/components/redux/api/baseApi";


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
          }),
        GetCommentsByParentId: builder.query({
            query: ({ parentId, page, limit }) => {
              return {
                url: `/comment/parent/${parentId}?page=${page}&limit=${limit}`,
                method: 'GET',
              };
            },
            providesTags: ['comment']
        })
    })
})

export const {
    useCreateCommentMutation,
    useGetCommentsQuery,
    useGetCommentsByParentIdQuery
} = commentApi