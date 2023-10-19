import { Prisma, Service } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { serviceSearchableFields } from './repairingService.constant';
import { IServiceFilter } from './repairingService.interface';

const insertInToDB = async (data: Service): Promise<Service> => {
  const result = await prisma.service.create({
    data,
    include: { category: true },
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Service');
  }

  return result;
};

const getSingleFromDB = async (id: string): Promise<Service | null> => {
  const service = await prisma.service.findFirst({
    where: {
      id,
    },
    include: { category: true, reviews: true },
  });

  return service;
};

const getAllFromDB = async (
  filters: IServiceFilter,
  options: IPaginationOptions
): Promise<IGenericResponse<Service[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: serviceSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  console.log(JSON.stringify(andConditions));

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (key === 'tags') {
          return {
            [key]: {
              hasSome: filterData['tags'],
            },
          };
        } else if (key === 'minPrice' || key === 'maxPrice') {
          if (key === 'minPrice') {
            return {
              price: {
                gte: Number(filterData[key]),
              },
            };
          } else {
            return {
              price: {
                lte: Number(filterData[key]),
              },
            };
          }
        } else if (key === 'categoryId') {
          return {
            category: {
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
  console.log(JSON.stringify(andConditions));
  const whereConditions: Prisma.ServiceWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.service.findMany({
    where: whereConditions,
    include: { category: true, reviews: true },
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  });
  const total = await prisma.service.count({
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
  data: Partial<Service>
): Promise<Service> => {
  const isExist = await prisma.service.findFirst({ where: { id } });

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Service doesn't Exist");
  }

  const result = await prisma.service.update({
    where: {
      id,
    },
    data: data,
    include: { category: true },
  });

  return result;
};

const deleteFromDB = async (id: string): Promise<Service> => {
  const result = await prisma.service.delete({ where: { id } });

  return result;
};

export const RepairingServiceService = {
  insertInToDB,
  getAllFromDB,
  getSingleFromDB,
  updateInToDB,
  deleteFromDB,
};
