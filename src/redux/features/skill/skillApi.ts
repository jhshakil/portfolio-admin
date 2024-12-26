import { baseApi } from "@/redux/api/baseApi";

const skillApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSkills: builder.query({
      query: () => ({ url: "/skill", method: "GET" }),
      providesTags: ["skill"],
    }),

    getSkill: builder.query({
      query: (data) => ({
        url: `/skill/${data.id}`,
        method: "GET",
      }),
      providesTags: ["skill"],
    }),

    createSkill: builder.mutation({
      query: (data) => ({
        url: "/skill",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["skill"],
    }),

    updateSkill: builder.mutation({
      query: (data) => ({
        url: `/skill/${data.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["skill"],
    }),

    deleteSkill: builder.mutation({
      query: (data) => ({
        url: `/skill/${data.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["skill"],
    }),
  }),
});

export const {
  useGetSkillsQuery,
  useGetSkillQuery,
  useCreateSkillMutation,
  useUpdateSkillMutation,
  useDeleteSkillMutation,
} = skillApi;
