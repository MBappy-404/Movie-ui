import { baseApi } from "../../api/baseApi";


const userApi = baseApi.injectEndpoints({
    endpoints: (builder)=> ({
        getAllUser: builder.query({
            query: ()=> ({
                url: "/user",
                method: "GET",
            }),
            providesTags: ['user'],
        }),
        getUser: builder.query({
            query: (id)=> ({
                url: `/user/${id}`,
                method: "GET",
            }),
            providesTags: ['user'],
        }),
        createUser: builder.mutation({
            query: (data) => ({
                url: "/user",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ['user'],
        }),
        updateUser: builder.mutation({
            query: ({ id, data }) => ({
                url: `/user/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['user'],
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/user/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['user'],
        })
    })
})

export const { 
    useGetAllUserQuery, 
    useGetUserQuery, 
    useCreateUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation 
} = userApi