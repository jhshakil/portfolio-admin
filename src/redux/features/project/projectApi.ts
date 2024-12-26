import { baseApi } from "@/redux/api/baseApi";

const projectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => ({ url: "/project", method: "GET" }),
      providesTags: ["project"],
    }),

    getProject: builder.query({
      query: (data) => ({
        url: `/project/${data.id}`,
        method: "GET",
      }),
      providesTags: ["project"],
    }),

    createProject: builder.mutation({
      query: (data) => ({
        url: "/project",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["project"],
    }),

    updateProject: builder.mutation({
      query: (data) => ({
        url: `/project/${data.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["project"],
    }),

    deleteProject: builder.mutation({
      query: (data) => ({
        url: `/project/${data.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["project"],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectApi;
