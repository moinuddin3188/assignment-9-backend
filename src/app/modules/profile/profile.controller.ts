import { User } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ProfileService } from './profile.service';

const getMyProfile = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  const result = await ProfileService.getMyProfile(user?.userId, user?.role);

  sendResponse<User>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Fetched successfully',
    data: result,
  });
});

const updateUserProfile = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body;
  const user = req.user;

  const result = await ProfileService.updateUserProfile(user?.userId, data);

  sendResponse<Omit<User, 'password'>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile updated successfully',
    data: result,
  });
});

const updateAdminProfile = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body;
  const user = req.user;

  const result = await ProfileService.updateAdminProfile(user?.userId, data);

  sendResponse<Omit<User, 'password'>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile updated successfully',
    data: result,
  });
});

const updateSuperAdminProfile = catchAsync(
  async (req: Request, res: Response) => {
    const { ...data } = req.body;
    const user = req.user;

    const result = await ProfileService.updateSuperAdminProfile(
      user?.userId,
      data
    );

    sendResponse<Omit<User, 'password'>>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Profile updated successfully',
      data: result,
    });
  }
);

const updateEmployeeProfile = catchAsync(
  async (req: Request, res: Response) => {
    const { ...data } = req.body;
    const user = req.user;

    const result = await ProfileService.updateEmployeeProfile(
      user?.userId,
      data
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Profile updated successfully',
      data: result,
    });
  }
);

export const ProfileController = {
  getMyProfile,
  updateUserProfile,
  updateAdminProfile,
  updateSuperAdminProfile,
  updateEmployeeProfile,
};
