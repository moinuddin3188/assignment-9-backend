import { Employee, User, UserRole } from '@prisma/client';
import httpStatus from 'http-status';
import { ENUM_USER_ROLE } from '../../../enums/user';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const getMyProfile = async (
  authId: string,
  authRole: UserRole
): Promise<User | null> => {
  const result = await prisma.user.findFirst({
    where: {
      id: authId,
      role: authRole,
    },
    include: {
      employee: true,
    },
  });

  return result;
};

const updateUserProfile = async (
  id: string,
  data: Partial<User>
): Promise<User> => {
  const isExist = await prisma.user.findFirst({ where: { id } });

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User doesn't Exist");
  }

  if (data.password) delete data.password;
  if (data.role) delete data.role;

  const result = await prisma.user.update({
    where: {
      id,
      role: ENUM_USER_ROLE.USER,
    },
    data: data,
  });

  return result;
};

const updateAdminProfile = async (
  id: string,
  data: Partial<User>
): Promise<User> => {
  const isExist = await prisma.user.findFirst({ where: { id } });
console.log(data)
  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Admin doesn't Exist");
  }

  if (data.password) delete data.password;
  if (data.role) delete data.role;

  const result = await prisma.user.update({
    where: {
      id,
      role: ENUM_USER_ROLE.ADMIN,
    },
    data: data,
  });
console.log(result)
  return result;
};

const updateSuperAdminProfile = async (
  id: string,
  data: Partial<User>
): Promise<User> => {
  const isExist = await prisma.user.findFirst({ where: { id } });

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Super Admin doesn't Exist");
  }

  if (data.password) delete data.password;
  if (data.role) delete data.role;

  const result = await prisma.user.update({
    where: {
      id,
      role: ENUM_USER_ROLE.SUPER_ADMIN,
    },
    data: data,
  });

  return result;
};

const updateEmployeeProfile = async (
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

  if (user?.password) delete user.password;
  if (user?.role) delete user.role;

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

export const ProfileService = {
  getMyProfile,
  updateUserProfile,
  updateAdminProfile,
  updateSuperAdminProfile,
  updateEmployeeProfile,
};
