import { baseApi } from "@/redux/api/baseApi";

const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: () => ({ url: "/blog", method: "GET" }),
      providesTags: ["blog"],
    }),

    getBlog: builder.query({
      query: (data) => ({
        url: `/blog/${data.id}`,
        method: "GET",
      }),
      providesTags: ["blog"],
    }),

    createBlog: builder.mutation({
      query: (data) => ({
        url: "/blog",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["blog"],
    }),

    updateBlog: builder.mutation({
      query: (data) => ({
        url: `/blog/${data.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["blog"],
    }),

    deleteBlog: builder.mutation({
      query: (data) => ({
        url: `/blog/${data.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["blog"],
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useGetBlogQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogApi;
