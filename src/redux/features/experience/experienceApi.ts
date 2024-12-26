import { baseApi } from "@/redux/api/baseApi";

const experienceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getExperiences: builder.query({
      query: () => ({ url: "/experience", method: "GET" }),
      providesTags: ["experience"],
    }),

    getExperience: builder.query({
      query: (data) => ({
        url: `/experience/${data.id}`,
        method: "GET",
      }),
      providesTags: ["experience"],
    }),

    createExperience: builder.mutation({
      query: (data) => ({
        url: "/experience",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["experience"],
    }),

    updateExperience: builder.mutation({
      query: (data) => ({
        url: `/experience/${data.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["experience"],
    }),

    deleteExperience: builder.mutation({
      query: (data) => ({
        url: `/experience/${data.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["experience"],
    }),
  }),
});

export const {
  useGetExperiencesQuery,
  useGetExperienceQuery,
  useCreateExperienceMutation,
  useUpdateExperienceMutation,
  useDeleteExperienceMutation,
} = experienceApi;
