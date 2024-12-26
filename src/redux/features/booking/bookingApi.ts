import { baseApi } from "@/redux/api/baseApi";
import { RootState, store } from "@/redux/store";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminBookings: builder.query({
      query: (data) => {
        const params = new URLSearchParams();
        if (data) {
          if (data.limit) {
            params.append("limit", data.limit);
          }
        }
        return {
          url: "/bookings",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["booking"],
    }),
    getUserBookings: builder.query({
      query: () => {
        const user = (store.getState() as RootState).auth.user;
        return {
          url: `/bookings/user/${user?.email}`,
          method: "GET",
        };
      },
      providesTags: ["booking"],
    }),
    createBooking: builder.mutation({
      query: (data) => ({
        url: "/bookings",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["booking"],
    }),
    checkAvailability: builder.mutation({
      query: (data) => ({
        url: `/check-availability?date=${data.date}&facility=${data.facility}`,
        method: "POST",
      }),
    }),
    confirmBooking: builder.mutation({
      query: (data) => ({
        url: `/bookings/confirm/${data._id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["booking"],
    }),
    deleteBooking: builder.mutation({
      query: (data) => ({
        url: `/bookings/${data._id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["booking"],
    }),
  }),
});

export const {
  useCheckAvailabilityMutation,
  useCreateBookingMutation,
  useGetAdminBookingsQuery,
  useGetUserBookingsQuery,
  useConfirmBookingMutation,
  useDeleteBookingMutation,
} = bookingApi;
