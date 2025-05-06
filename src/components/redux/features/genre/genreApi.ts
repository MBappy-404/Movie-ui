import { baseApi } from "@/components/redux/api/baseApi";

const genreApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllGenres: builder.query({
      query: () => ({
        url: "/genre",
        method: "GET",
      }),
      providesTags: ["genres"],
    }),
    createGenre: builder.mutation({
      query: (data) => ({
        url: "/genre",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["genres"],
    }),
    updateGenre: builder.mutation({
      query: ({ genreIdId, data }) => ({
        url: `/genre/${genreIdId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["genres"],
    }),
    deleteGenre: builder.mutation({
      query: (genreId) => ({
        url: `/genre/${genreId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["genres"],
    }),
  }),
});

export const {
  useGetAllGenresQuery,
  useCreateGenreMutation,
  useDeleteGenreMutation,
  useUpdateGenreMutation,
} = genreApi;
