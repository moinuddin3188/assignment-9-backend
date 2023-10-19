import { z } from 'zod';
import { bookingStatus } from './booking.constant';

const createBooking = z.object({
  body: z.object({
    bookingDate: z.string({
      required_error: 'Booking Date is required',
    }),
    bookingTime: z.string({
      required_error: 'Booking Time is required',
    }),
    contactNo: z.string({
      required_error: 'ContactNo is required',
    }),
    address: z.string({
      required_error: 'Address is required',
    }),
    userId: z.string({
      required_error: 'userId is required',
    }),
    serviceId: z.string({
      required_error: 'serviceId is required',
    }),
  }),
});

const updateBooking = z.object({
  body: z.object({
    bookingDate: z.string(),
    bookingTime: z.string(),
    contactNo: z.string(),
    address: z.string(),
    userId: z.string(),
    serviceId: z.string(),
    status: z.enum([...bookingStatus] as [string, ...string[]]).optional(),
  }),
});

export const BookingValidation = {
  createBooking,
  updateBooking,
};
