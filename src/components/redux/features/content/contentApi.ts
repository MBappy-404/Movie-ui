import { baseApi } from "../../api/baseApi";

const contentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createContent: builder.mutation({
      query: (data) => ({
        url: "/content",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["content"],
    }),

    getAllContent: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        // if (args) {
        //   args.forEach((item: any) => {
        //     params.append(item?.name, item?.value as string);
        //   });
        // }

        return {
          url: "/content",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["content"],
      // transformResponse: (response: TResponseRedux<TSemester[]>) => {
      //   return {
      //     data: response.data,
      //     meta: response.meta,
      //   };
      // },
    }),
    deleteContent: builder.mutation({
      query: (params) => ({
        url: `/content/${params?.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["content"],
    }),
    getContent: builder.query({
      query: (params) => ({
        url: `/content/${params?.id}`,
        method: "GET",
      }),
      providesTags: ['content'],
    }),
    updateContent: builder.mutation({
      query: ({ productId, formData }) => ({
        url: `/content/${productId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["content"],
    }),
  }),
});

export const {
    useCreateContentMutation,
    useGetAllContentQuery,
    useDeleteContentMutation,
    useGetContentQuery,
    useUpdateContentMutation,
} = contentApi;
