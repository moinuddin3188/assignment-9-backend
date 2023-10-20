"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingValidation = void 0;
const zod_1 = require("zod");
const booking_constant_1 = require("./booking.constant");
const createBooking = zod_1.z.object({
    body: zod_1.z.object({
        bookingDate: zod_1.z.string({
            required_error: 'Booking Date is required',
        }),
        contactNo: zod_1.z.string({
            required_error: 'ContactNo is required',
        }),
        address: zod_1.z.string({
            required_error: 'Address is required',
        }),
        userId: zod_1.z.string({
            required_error: 'userId is required',
        }),
        serviceId: zod_1.z.string({
            required_error: 'serviceId is required',
        }),
    }),
});
const updateBooking = zod_1.z.object({
    body: zod_1.z.object({
        bookingDate: zod_1.z.string(),
        contactNo: zod_1.z.string(),
        address: zod_1.z.string(),
        userId: zod_1.z.string(),
        serviceId: zod_1.z.string(),
        status: zod_1.z.enum([...booking_constant_1.bookingStatus]).optional(),
    }),
});
exports.BookingValidation = {
    createBooking,
    updateBooking,
};
