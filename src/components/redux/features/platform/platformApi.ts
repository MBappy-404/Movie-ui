import { baseApi } from "../../api/baseApi";


const platformApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPlatform: builder.query({
      query: () => ({
        url: "/platform",
        method: "GET",
      }),
      providesTags: ["platforms"],
    }),
    createPlatform: builder.mutation({
      query: (data) => ({
        url: "/platform",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["platforms"],
    }),
    updatePlatform: builder.mutation({
      query: ({ platformId, formData }) => ({
        url: `/platform/${platformId}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["platforms"],
    }),
    deletePlatform: builder.mutation({
      query: (platformId) => ({
        url: `/platform/${platformId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["platforms"],
    }),
  }),
});

export const {
  useGetAllPlatformQuery,
  useCreatePlatformMutation,
  useUpdatePlatformMutation,
  useDeletePlatformMutation,
} = platformApi;
