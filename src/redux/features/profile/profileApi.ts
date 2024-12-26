import { baseApi } from "@/redux/api/baseApi";

const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfiles: builder.query({
      query: () => ({ url: "/profile", method: "GET" }),
      providesTags: ["profile"],
    }),

    createProfile: builder.mutation({
      query: (data) => ({
        url: "/profile",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["profile"],
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: `/profile/${data.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["profile"],
    }),
  }),
});

export const {
  useCreateProfileMutation,
  useGetProfilesQuery,
  useUpdateProfileMutation,
} = profileApi;
