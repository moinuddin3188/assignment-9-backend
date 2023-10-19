import { Category } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { CategoryService } from './category.service';

const insertInToDB = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body;

  const result = await CategoryService.insertInToDB(data);

  sendResponse<Category>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category Created successfully',
    data: result,
  });
});

const getSingleFromDB = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await CategoryService.getSingleFromDB(id);

  sendResponse<Category>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category fetched successfully',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, paginationFields);
  const filters = pick(req.query, ['searchTerm']);

  const result = await CategoryService.getAllFromDB(options, filters);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const updateInToDB = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const { ...updatedData } = req.body;

  const result = await CategoryService.updateInToDB(id, updatedData);

  sendResponse<Category>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category Updated successfully',
    data: result,
  });
});

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await CategoryService.deleteFromDB(id);

  sendResponse<Category>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category Updated successfully',
    data: result,
  });
});

export const CategoryController = {
  insertInToDB,
  getAllFromDB,
  getSingleFromDB,
  updateInToDB,
  deleteFromDB,
};
