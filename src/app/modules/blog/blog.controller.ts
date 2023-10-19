import { Blog } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { blogFilterableFields } from './blog.constant';
import { BlogService } from './blog.service';

const insertInToDB = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body;

  const result = await BlogService.insertInToDB(data);

  sendResponse<Blog>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog Created successfully',
    data: result,
  });
});

const getSingleFromDB = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await BlogService.getSingleFromDB(id);

  sendResponse<Blog>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog fetched successfully',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, blogFilterableFields);
  const options = pick(req.query, paginationFields);
  const user = req.user;

  const result = await BlogService.getAllFromDB(user?.role, filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const updateInToDB = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const { ...updatedData } = req.body;

  const result = await BlogService.updateInToDB(id, updatedData);

  sendResponse<Blog>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog Updated successfully',
    data: result,
  });
});

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await BlogService.deleteFromDB(id);

  sendResponse<Blog>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog Updated successfully',
    data: result,
  });
});

export const BlogController = {
  insertInToDB,
  getAllFromDB,
  getSingleFromDB,
  updateInToDB,
  deleteFromDB,
};
