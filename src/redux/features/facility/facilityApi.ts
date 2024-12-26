import { baseApi } from "@/redux/api/baseApi";

const facilityApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFacilities: builder.query({
      query: (data) => {
        const params = new URLSearchParams();

        if (data) {
          if (data.searchTerm) {
            params.append("searchTerm", data.searchTerm);
          }
          if (data.getterThan) {
            params.append("getterThan", data.getterThan);
          }
          if (data.lessThan) {
            params.append("lessThan", data.lessThan);
          }
          if (data.sort) {
            params.append("sort", data.sort);
          }
          if (data.limit) {
            params.append("limit", data.limit);
          }
        }

        return {
          url: "/facility",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["facility"],
    }),
    getFacility: builder.query({
      query: (data) => ({
        url: `/facility/${data._id}`,
        method: "GET",
      }),
      providesTags: ["facility"],
    }),
    createFacility: builder.mutation({
      query: (data) => ({
        url: "/facility",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["facility"],
    }),
    updateFacility: builder.mutation({
      query: (data) => ({
        url: `/facility/${data._id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["facility"],
    }),
    deleteFacility: builder.mutation({
      query: (data) => ({
        url: `/facility/${data._id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["facility"],
    }),
  }),
});

export const {
  useCreateFacilityMutation,
  useGetFacilitiesQuery,
  useGetFacilityQuery,
  useUpdateFacilityMutation,
  useDeleteFacilityMutation,
} = facilityApi;
