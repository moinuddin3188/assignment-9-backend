import { User } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { userFilterableFields } from './user.constant';
import { UserService } from './user.service';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const { ...userData } = req.body;

  const result = await UserService.createUser(userData);

  sendResponse<Omit<User, 'password'>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully',
    data: result,
  });
});

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const { ...adminData } = req.body;

  const result = await UserService.createAdmin(adminData);

  sendResponse<Omit<User, 'password'>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin created successfully',
    data: result,
  });
});

const createEmployee = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body;

  const result = await UserService.createEmployee(data);
  // eslint-disable-next-line no-unused-vars
  const { password, ...others } = result;

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Employee created successfully',
    data: others,
  });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await UserService.getSingleUser(id);
  if (result) result.password = 'Not accessible';

  sendResponse<Omit<User, 'password'> | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User fetched successfully',
    data: result,
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userFilterableFields);
  const options = pick(req.query, paginationFields);
  const result = await UserService.getAllUsers(filters, options);

  if (result?.data) {
    result.data.map(item => (item.password = 'Not accessible'));
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const { ...updatedData } = req.body;

  const result = await UserService.updateUser(id, updatedData);
  if (result) result.password = 'Not accessible';

  sendResponse<User>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Updated successfully',
    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await UserService.deleteUser(id);
  if (result) result.password = 'Not accessible';

  sendResponse<User>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Updated successfully',
    data: result,
  });
});

export const UserController = {
  createUser,
  createAdmin,
  createEmployee,
  getSingleUser,
  getAllUsers,
  updateUser,
  deleteUser,
};
