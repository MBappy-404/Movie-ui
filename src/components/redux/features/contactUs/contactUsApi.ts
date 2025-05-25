import { baseApi } from "../../api/baseApi";

const ContactUsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllContactUs: builder.query({
      query: () => ({
        url: "/contact-us",
        method: "GET",
      }),
      providesTags: ["contactUs"],
    }),
    createContactUs: builder.mutation({
      query: (data) => ({
        url: "/contact-us",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["contactUs"],
    }),
    deleteContactUs: builder.mutation({
      query: (id) => ({
        url: `/contact-us/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["contactUs"],
    }),
  }),
});

export const {
  useCreateContactUsMutation,
  useGetAllContactUsQuery,
  useDeleteContactUsMutation,
} = ContactUsApi;
