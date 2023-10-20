import { Employee, Prisma, User } from '@prisma/client';
import httpStatus from 'http-status';
import { ENUM_USER_ROLE } from '../../../enums/user';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { userSearchableFields } from './user.constant';
import { IUserFilter } from './user.interface';
import { hashPassword } from './user.utils';

const createUser = async (data: User): Promise<Omit<User, 'password'>> => {
  const hashedPassword = await hashPassword(data.password);
  data['password'] = hashedPassword;
  data['role'] = ENUM_USER_ROLE.USER;

  const result = await prisma.user.create({
    data,
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create User');
  }

  // eslint-disable-next-line no-unused-vars
  const { password, ...others } = result;

  return others;
};

const createAdmin = async (data: User): Promise<Omit<User, 'password'>> => {
  const hashedPassword = await hashPassword(data.password);
  data['password'] = hashedPassword;
  data['role'] = ENUM_USER_ROLE.ADMIN;

  const newAdmin = await prisma.user.create({
    data,
  });

  if (!newAdmin) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Admin');
  }

  // eslint-disable-next-line no-unused-vars
  const { password, ...others } = newAdmin;

  return others;
};

const createSuperAdmin = async (data: User): Promise<Omit<User, 'password'>> => {
  const hashedPassword = await hashPassword(data.password);
  data['password'] = hashedPassword;
  data['role'] = ENUM_USER_ROLE.SUPER_ADMIN;

  const newAdmin = await prisma.user.create({
    data,
  });

  if (!newAdmin) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create super Admin');
  }

  // eslint-disable-next-line no-unused-vars
  const { password, ...others } = newAdmin;

  return others;
};

const createEmployee = async (data: {
  user: User;
  employee: Employee;
}): Promise<any> => {
  const { user, employee } = data;

  const hashedPassword = await hashPassword(user.password);
  user['password'] = hashedPassword;
  user.role = ENUM_USER_ROLE.EMPLOYEE;

  const result = await prisma.$transaction(async transactionClient => {
    const newUser = await transactionClient.user.create({
      data: user,
    });

    if (!newUser) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create User');
    }

    employee.userId = newUser.id;

    const newEmployee = await transactionClient.employee.create({
      data: employee,
    });

    if (!newEmployee) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Employee');
    }

    return newUser;
  });

  if (result) {
    const response = await prisma.user.findFirst({
      where: {
        id: result.id,
      },
      include: {
        employee: true,
      },
    });

    return response;
  }
};

const getSingleUser = async (id: string): Promise<User | null> => {
  const user = await prisma.user.findFirst({
    where: {
      id,
      role: ENUM_USER_ROLE.USER,
    },
  });

  return user;
};

const getAllUsers = async (
  filters: IUserFilter,
  options: IPaginationOptions
): Promise<IGenericResponse<User[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: userSearchableFields.map(field => ({
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
      ? { AND: [...andConditions, { role: ENUM_USER_ROLE.USER }] }
      : { role: ENUM_USER_ROLE.USER };

  const result = await prisma.user.findMany({
    where: { ...whereConditions },
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
    where: { ...whereConditions, role: ENUM_USER_ROLE.USER },
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

const updateUser = async (id: string, data: Partial<User>): Promise<User> => {
  const isExist = await prisma.user.findFirst({ where: { id } });

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User doesn't Exist");
  }

  const result = await prisma.user.update({
    where: {
      id,
      role: ENUM_USER_ROLE.USER,
    },
    data: data,
  });

  return result;
};

const deleteUser = async (id: string): Promise<User> => {
  const user = await prisma.user.delete({
    where: {
      id,
    },
  });

  return user;
};

export const UserService = {
  createUser,
  createAdmin,
  createSuperAdmin,
  createEmployee,
  getSingleUser,
  getAllUsers,
  updateUser,
  deleteUser,
};
