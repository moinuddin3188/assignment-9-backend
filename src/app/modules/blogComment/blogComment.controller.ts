import { BlogComment } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { BlogCommentService } from './blogComment.service';

const insertInToDB = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body;

  const result = await BlogCommentService.insertInToDB(data);

  sendResponse<BlogComment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog Comment Created successfully',
    data: result,
  });
});

const getSingleFromDB = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await BlogCommentService.getSingleFromDB(id);

  sendResponse<BlogComment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog Comment fetched successfully',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, paginationFields);

  const result = await BlogCommentService.getAllFromDB(options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog Comment fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const updateInToDB = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const { ...updatedData } = req.body;

  const result = await BlogCommentService.updateInToDB(id, updatedData);

  sendResponse<BlogComment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'BlogComment Updated successfully',
    data: result,
  });
});

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await BlogCommentService.deleteFromDB(id);

  sendResponse<BlogComment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'BlogComment Updated successfully',
    data: result,
  });
});

export const BlogCommentController = {
  insertInToDB,
  getAllFromDB,
  getSingleFromDB,
  updateInToDB,
  deleteFromDB,
};
