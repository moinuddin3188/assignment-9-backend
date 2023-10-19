import { Category, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { categorySearchableFields } from './category.constant';
import { ICategoryFilter } from './category.interface';

const insertInToDB = async (data: Category): Promise<Category> => {
  const result = await prisma.category.create({ data });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Category');
  }

  return result;
};

const getSingleFromDB = async (id: string): Promise<Category | null> => {
  const result = await prisma.category.findFirst({
    where: {
      id,
    },
  });

  return result;
};

const getAllFromDB = async (
  options: IPaginationOptions,
  filters: ICategoryFilter
): Promise<IGenericResponse<Category[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: categorySearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  const whereConditions: Prisma.CategoryWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.category.findMany({
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

  const total = await prisma.category.count({ where: whereConditions });

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
  data: Partial<Category>
): Promise<Category> => {
  const isExist = await prisma.category.findFirst({ where: { id } });

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Category doesn't Exist");
  }

  const result = await prisma.category.update({
    where: {
      id,
    },
    data: data,
  });

  return result;
};

const deleteFromDB = async (id: string): Promise<Category> => {
  const isExist = await prisma.category.findFirst({ where: { id } });

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Category doesn't Exist");
  }

  const result = await prisma.category.delete({ where: { id } });

  return result;
};

export const CategoryService = {
  insertInToDB,
  getAllFromDB,
  getSingleFromDB,
  updateInToDB,
  deleteFromDB,
};
