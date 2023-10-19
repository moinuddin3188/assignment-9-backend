import { User } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { adminFilterableFields } from './admin.constant';
import { AdminService } from './admin.service';

const getSingleAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await AdminService.getSingleAdmin(id);
  if (result) result.password = 'Not accessible';

  sendResponse<User>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin fetched successfully',
    data: result,
  });
});

const getAllAdmins = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, adminFilterableFields);
  const options = pick(req.query, paginationFields);

  const result = await AdminService.getAllAdmins(filters, options);
  if (result?.data) {
    result.data.map(item => (item.password = 'Not accessible'));
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admins fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const updateAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = req.user
  const { ...updatedData } = req.body;

  const result = await AdminService.updateAdmin(user?.role, id, updatedData);
  if (result) result.password = 'Not accessible';

  sendResponse<User>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin Updated successfully',
    data: result,
  });
});

const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await AdminService.deleteAdmin(id);
  if (result) result.password = 'Not accessible';

  sendResponse<User>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin Updated successfully',
    data: result,
  });
});

export const AdminController = {
  getAllAdmins,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};
