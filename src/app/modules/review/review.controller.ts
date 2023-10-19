import { Review } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { reviewFilterableFields } from './review.constant';
import { ReviewService } from './review.service';

const insertInToDB = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body;

  const result = await ReviewService.insertInToDB(data);

  sendResponse<Review>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review Created successfully',
    data: result,
  });
});

const getSingleFromDB = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await ReviewService.getSingleFromDB(id);

  sendResponse<Review>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review fetched successfully',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, reviewFilterableFields);
  const options = pick(req.query, paginationFields);

  const result = await ReviewService.getAllFromDB(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const updateInToDB = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = req.user;
  const { ...updatedData } = req.body;

  const result = await ReviewService.updateInToDB(
    user?.userId,
    id,
    updatedData
  );

  sendResponse<Review>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review Updated successfully',
    data: result,
  });
});

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = req.user;

  const result = await ReviewService.deleteFromDB(user?.userId, id);

  sendResponse<Review>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review Updated successfully',
    data: result,
  });
});

export const ReviewController = {
  insertInToDB,
  getAllFromDB,
  getSingleFromDB,
  updateInToDB,
  deleteFromDB,
};
