import { Blog, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import { ENUM_USER_ROLE } from '../../../enums/user';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { blogSearchableFields } from './blog.constant';
import { IBlogFilter } from './blog.interface';

const insertInToDB = async (data: Blog): Promise<Blog> => {
  data.status = 'PENDING';

  const result = await prisma.blog.create({ data });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Blog');
  }

  return result;
};

const getSingleFromDB = async (id: string): Promise<Blog | null> => {
  const blog = await prisma.blog.findFirst({
    where: {
      id,
    },
    include: {
      blogComments: true
    }
  });

  return blog;
};

const getAllFromDB = async (
  authRole: string,
  filters: IBlogFilter,
  options: IPaginationOptions
): Promise<IGenericResponse<Blog[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  if (authRole === ENUM_USER_ROLE.USER) filterData.status = 'PUBLISHED';

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: blogSearchableFields.map(field => ({
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
        if (key === 'tags') {
          return {
            [key]: {
              hasSome: filterData['tags'],
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

  const whereConditions: Prisma.BlogWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.blog.findMany({
    where: whereConditions,
    include: {
      blogComments: true
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
  const total = await prisma.blog.count({
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

const updateInToDB = async (id: string, data: Partial<Blog>): Promise<Blog> => {
  const isExist = await prisma.blog.findFirst({ where: { id } });

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Blog doesn't Exist");
  }

  const result = await prisma.blog.update({
    where: {
      id,
    },
    data: data,
  });

  return result;
};

const deleteFromDB = async (id: string): Promise<Blog> => {
  const isExist = await prisma.blog.findFirst({ where: { id } });

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Blog doesn't Exist");
  }

  const result = await prisma.blog.delete({ where: { id } });

  return result;
};

export const BlogService = {
  insertInToDB,
  getAllFromDB,
  getSingleFromDB,
  updateInToDB,
  deleteFromDB,
};
