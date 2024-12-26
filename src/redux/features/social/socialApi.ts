import { baseApi } from "@/redux/api/baseApi";

const socialApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSocials: builder.query({
      query: () => ({ url: "/social", method: "GET" }),
      providesTags: ["social"],
    }),

    getSocial: builder.query({
      query: (data) => ({
        url: `/social/${data.id}`,
        method: "GET",
      }),
      providesTags: ["social"],
    }),

    createSocial: builder.mutation({
      query: (data) => ({
        url: "/social",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["social"],
    }),

    updateSocial: builder.mutation({
      query: (data) => ({
        url: `/social/${data.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["social"],
    }),

    deleteSocial: builder.mutation({
      query: (data) => ({
        url: `/social/${data.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["social"],
    }),
  }),
});

export const {
  useGetSocialsQuery,
  useGetSocialQuery,
  useCreateSocialMutation,
  useUpdateSocialMutation,
  useDeleteSocialMutation,
} = socialApi;
