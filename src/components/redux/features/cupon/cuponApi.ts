import { baseApi } from "../../api/baseApi";


const cuponApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        validateCupon: builder.mutation({
            query: (data) => ({
                url: "/coupon/validate",
                method: "POST",
                body: data,
            }),
        }),
    }),
});

export const { useValidateCuponMutation } = cuponApi;
