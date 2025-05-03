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
        })
    })
})

export const { useGetAllUserQuery, useGetUserQuery}= userApi