import { Prisma, Review } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { IReviewFilter } from './review.interface';

const insertInToDB = async (data: Review): Promise<Review> => {
  const result = await prisma.review.create({ data });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Review');
  }

  return result;
};

const getSingleFromDB = async (id: string): Promise<Review | null> => {
  const review = await prisma.review.findFirst({
    where: {
      id,
    },
    include: {
      service: true,
      user: true,
    },
  });

  return review;
};

const getAllFromDB = async (
  filters: IReviewFilter,
  options: IPaginationOptions
): Promise<IGenericResponse<Review[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { ...filterData } = filters;

  const andConditions = [];

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        return {
          [key]: {
            equals: (filterData as any)[key],
          },
        };
      }),
    });
  }

  const whereConditions: Prisma.ReviewWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.review.findMany({
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
  const total = await prisma.review.count({
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
  authId: string,
  id: string,
  data: Partial<Review>
): Promise<Review> => {
  const isExist = await prisma.review.findFirst({
    where: { id, user: { id: authId } },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
  }

  const result = await prisma.review.update({
    where: {
      id,
    },
    include: {
      user: true,
    },
    data: data,
  });

  return result;
};

const deleteFromDB = async (authId: string, id: string): Promise<Review> => {
  const isExist = await prisma.review.findFirst({
    where: { id, user: { id: authId } },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
  }

  const result = await prisma.review.delete({ where: { id } });

  return result;
};

export const ReviewService = {
  insertInToDB,
  getAllFromDB,
  getSingleFromDB,
  updateInToDB,
  deleteFromDB,
};
