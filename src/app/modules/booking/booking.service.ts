import { Booking, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import {
  bookingRelationalFields,
  bookingRelationalFieldsMapper,
  bookingSearchableFields,
} from './booking.constant';
import { IBookingFilter } from './booking.interface';

const insertInToDB = async (
  authId: string,
  data: Booking
): Promise<Booking> => {
  data.userId = authId;

  const result = await prisma.booking.create({ data });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Booking');
  }

  return result;
};

const getSingleFromDB = async (id: string): Promise<Booking | null> => {
  const booking = await prisma.booking.findFirst({
    where: {
      id,
    },
    include: {
      service: true,
      user: true,
    },
  });

  return booking;
};

const getAllFromDB = async (
  filters: IBookingFilter,
  options: IPaginationOptions
): Promise<IGenericResponse<Booking[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: bookingSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (bookingRelationalFields.includes(key)) {
          return {
            [bookingRelationalFieldsMapper[key]]: {
              id: (filterData as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }

  const whereConditions: Prisma.BookingWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.booking.findMany({
    where: whereConditions,
    include: {
      service: true,
      user: true,
    },
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  });
  const total = await prisma.booking.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const updateInToDB = async (
  id: string,
  data: Partial<Booking>
): Promise<Booking> => {
  const isExist = await prisma.booking.findFirst({ where: { id } });

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Booking doesn't Exist");
  }

  const result = await prisma.booking.update({
    where: {
      id,
    },
    include: {
      service: true,
      user: true,
    },
    data: data,
  });

  return result;
};

const deleteFromDB = async (id: string): Promise<Booking> => {
  const isExist = await prisma.booking.findFirst({ where: { id } });

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Booking doesn't Exist");
  }

  const result = await prisma.booking.delete({ where: { id } });

  return result;
};

const getMyBookings = async (
  authId: string,
  filters: Omit<IBookingFilter, 'searchTerm'>,
  options: IPaginationOptions
): Promise<IGenericResponse<Booking[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { ...filterData } = filters;

  const andConditions = [];

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (bookingRelationalFields.includes(key)) {
          return {
            [bookingRelationalFieldsMapper[key]]: {
              id: (filterData as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }

  const whereConditions: Prisma.BookingWhereInput =
    andConditions.length > 0
      ? { AND: [...andConditions, { user: { id: authId } }] }
      : { user: { id: authId } };

  const result = await prisma.booking.findMany({
    where: whereConditions,
    include: {
      service: true,
      user: true,
    },
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  });
  const total = await prisma.booking.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const cancelMyBooking = async (
  authId: string,
  id: string
): Promise<Booking> => {
  const isExist = await prisma.booking.findFirst({
    where: {
      id,
      user: {
        id: authId,
      },
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Booking doesn't Exist");
  }

  const result = await prisma.booking.update({
    where: {
      id,
    },
    include: {
      service: true,
      user: true,
    },
    data: {
      status: 'CANCELED',
    },
  });

  return result;
};

export const BookingService = {
  insertInToDB,
  getAllFromDB,
  getSingleFromDB,
  updateInToDB,
  deleteFromDB,
  getMyBookings,
  cancelMyBooking,
};
