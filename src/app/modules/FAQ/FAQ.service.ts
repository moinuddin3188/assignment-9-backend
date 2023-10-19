import { FAQ, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { faqSearchableFields } from './FAQ.constant';
import { IFAQFilter } from './FAQ.interface';

const insertInToDB = async (data: FAQ): Promise<FAQ> => {
  const result = await prisma.fAQ.create({ data });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create FAQ');
  }

  return result;
};

const getSingleFromDB = async (id: string): Promise<FAQ | null> => {
  const faq = await prisma.fAQ.findFirst({
    where: {
      id,
    },
  });

  return faq;
};

const getAllFromDB = async (
  filters: IFAQFilter,
  options: IPaginationOptions
): Promise<IGenericResponse<FAQ[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: faqSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  const whereConditions: Prisma.FAQWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.fAQ.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  });
  const total = await prisma.fAQ.count({
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

const updateInToDB = async (id: string, data: Partial<FAQ>): Promise<FAQ> => {
  const isExist = await prisma.fAQ.findFirst({ where: { id } });

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "FAQs doesn't Exist");
  }

  const result = await prisma.fAQ.update({
    where: {
      id,
    },
    data: data,
  });

  return result;
};

const deleteFromDB = async (id: string): Promise<FAQ> => {
  const isExist = await prisma.fAQ.findFirst({ where: { id } });

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "FAQs doesn't Exist");
  }

  const result = await prisma.fAQ.delete({ where: { id } });

  return result;
};

export const FAQService = {
  insertInToDB,
  getAllFromDB,
  getSingleFromDB,
  updateInToDB,
  deleteFromDB,
};
