import { Prisma, User } from '@prisma/client';
import httpStatus from 'http-status';
import { ENUM_USER_ROLE } from '../../../enums/user';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { adminSearchableFields } from './admin.constant';
import { IAdminFilter } from './admin.interface';

const getSingleAdmin = async (id: string): Promise<User | null> => {
  const result = await prisma.user.findFirst({
    where: {
      id,
      role: ENUM_USER_ROLE.ADMIN,
    },
  });

  return result;
};

const getAllAdmins = async (
  filters: IAdminFilter,
  options: IPaginationOptions
): Promise<IGenericResponse<User[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: adminSearchableFields.map(field => ({
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
        return {
          [key]: {
            equals: (filterData as any)[key],
          },
        };
      }),
    });
  }

  const whereConditions: Prisma.UserWhereInput =
    andConditions.length > 0
      ? { AND: [...andConditions, { role: ENUM_USER_ROLE.ADMIN }] }
      : { role: ENUM_USER_ROLE.ADMIN };

  const result = await prisma.user.findMany({
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

  const total = await prisma.user.count({
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

const updateAdmin = async (
  authRole: string,
  id: string,
  data: Partial<User>
): Promise<User> => {
  const isExist = await prisma.user.findFirst({ where: { id } });

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Admin doesn't Exist");
  }

  if (authRole !== ENUM_USER_ROLE.SUPER_ADMIN && data?.role) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'You are not authorized to change user role'
    );
  }

  const result = await prisma.user.update({
    where: {
      id,
      role: ENUM_USER_ROLE.ADMIN,
    },
    data: data,
  });

  return result;
};

const deleteAdmin = async (id: string): Promise<User> => {
  const result = await prisma.user.delete({
    where: {
      id,
      role: ENUM_USER_ROLE.ADMIN,
    },
  });

  return result;
};

export const AdminService = {
  getSingleAdmin,
  getAllAdmins,
  updateAdmin,
  deleteAdmin,
};
