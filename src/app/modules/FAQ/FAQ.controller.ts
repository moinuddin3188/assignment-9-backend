import { FAQ } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { faqFilterableFields } from './FAQ.constant';
import { FAQService } from './FAQ.service';

const insertInToDB = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body;

  const result = await FAQService.insertInToDB(data);

  sendResponse<FAQ>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'FAQ Created successfully',
    data: result,
  });
});

const getSingleFromDB = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await FAQService.getSingleFromDB(id);

  sendResponse<FAQ>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'FAQ fetched successfully',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, faqFilterableFields);
  const options = pick(req.query, paginationFields);

  const result = await FAQService.getAllFromDB(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'FAQ fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const updateInToDB = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const { ...updatedData } = req.body;

  const result = await FAQService.updateInToDB(id, updatedData);

  sendResponse<FAQ>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'FAQ Updated successfully',
    data: result,
  });
});

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await FAQService.deleteFromDB(id);

  sendResponse<FAQ>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'FAQ Updated successfully',
    data: result,
  });
});

export const FAQController = {
  insertInToDB,
  getAllFromDB,
  getSingleFromDB,
  updateInToDB,
  deleteFromDB,
};
