import { Booking } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { bookingFilterableFields } from './booking.constant';
import { BookingService } from './booking.service';

const insertInToDB = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body;
  const user: JwtPayload | null = req.user;

  const result = await BookingService.insertInToDB(user?.userId, data);

  sendResponse<Booking>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking Created successfully',
    data: result,
  });
});

const getSingleFromDB = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await BookingService.getSingleFromDB(id);

  sendResponse<Booking>(res, {
    statusCode: httpStatus.BAD_REQUEST,
    success: true,
    message: 'Booking fetched successfully',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, bookingFilterableFields);
  const options = pick(req.query, paginationFields);

  const result = await BookingService.getAllFromDB(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const updateInToDB = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const { ...updatedData } = req.body;

  const result = await BookingService.updateInToDB(id, updatedData);

  sendResponse<Booking>(res, {
    statusCode: httpStatus.BAD_REQUEST,
    success: true,
    message: 'Booking Updated successfully',
    data: result,
  });
});

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await BookingService.deleteFromDB(id);

  sendResponse<Booking>(res, {
    statusCode: httpStatus.BAD_REQUEST,
    success: true,
    message: 'Booking Updated successfully',
    data: result,
  });
});

const getMyBookings = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, bookingFilterableFields);
  const options = pick(req.query, paginationFields);
  const user = req.user;

  const result = await BookingService.getMyBookings(
    user?.userId,
    filters,
    options
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const cancelMyBooking = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = req.user;

  const result = await BookingService.cancelMyBooking(user?.userId, id);

  sendResponse<Booking>(res, {
    statusCode: httpStatus.BAD_REQUEST,
    success: true,
    message: 'Booking Canceled successfully',
    data: result,
  });
});

export const BookingController = {
  insertInToDB,
  getAllFromDB,
  getSingleFromDB,
  updateInToDB,
  deleteFromDB,
  getMyBookings,
  cancelMyBooking,
};
