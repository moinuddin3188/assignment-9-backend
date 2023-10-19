import { Employee, Prisma, User } from '@prisma/client';
import httpStatus from 'http-status';
import { ENUM_USER_ROLE } from '../../../enums/user';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { employeeSearchableFields } from './employee.constant';
import { IEmployeeFilter } from './employee.interface';

const getSingleEmployee = async (id: string): Promise<User | null> => {
  const employee = await prisma.user.findFirst({
    where: {
      id,
    },
    include: {
      employee: true,
    },
  });

  return employee;
};

const getAllEmployees = async (
  filters: IEmployeeFilter,
  options: IPaginationOptions
): Promise<IGenericResponse<User[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: employeeSearchableFields.map(field => ({
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
      ? { AND: [...andConditions, { role: ENUM_USER_ROLE.EMPLOYEE }] }
      : { role: ENUM_USER_ROLE.EMPLOYEE };

  const result = await prisma.user.findMany({
    where: whereConditions,
    include: {
      employee: true,
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

const updateEmployee = async (
  id: string,
  data: Partial<{
    user: Partial<User>;
    employee: Partial<Employee>;
  }>
): Promise<any> => {
  const isExist = await prisma.user.findFirst({
    where: { id },
    include: {
      employee: true,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Employee doesn't Exist");
  }

  const { user, employee } = data;

  const result = await prisma.$transaction(async transactionClient => {
    if (user) {
      await transactionClient.user.update({
        where: { id },
        data: user,
      });
    }

    if (employee) {
      await transactionClient.employee.update({
        where: { id: isExist.employee?.id },
        data: employee,
      });
    }

    return true;
  });

  if (result) {
    const response = await prisma.user.findFirst({
      where: {
        id,
      },
      include: {
        employee: true,
      },
    });

    return response;
  }
};

const deleteEmployee = async (id: string): Promise<User> => {
  const isExist = await prisma.user.findFirst({
    where: { id },
    include: {
      employee: true,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Employee doesn't Exist");
  }

  const result = await prisma.$transaction(async transactionClient => {
    const deletedUser = await transactionClient.user.delete({
      where: { id },
    });

    await transactionClient.employee.delete({
      where: { id: isExist.employee?.id },
    });

    return deletedUser;
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to delete');
  }

  return result;
};

export const EmployeeService = {
  getAllEmployees,
  getSingleEmployee,
  updateEmployee,
  deleteEmployee,
};
