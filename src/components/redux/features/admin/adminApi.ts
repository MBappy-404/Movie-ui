 import { baseApi } from "@/components/redux/api/baseApi";
 
 const adminApi = baseApi.injectEndpoints({
   endpoints: (builder) => ({
    dashboardStats: builder.query({
       query: () => ({
         url: `/admin/dashboard-stats`,
         method: "GET",
       }),
       providesTags: ['admin'],
     }),
  
   
   }),
 });
 
 export const {useDashboardStatsQuery } =
   adminApi;
 