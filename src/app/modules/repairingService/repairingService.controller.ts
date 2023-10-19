import { Service } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { serviceFilterableFields } from './repairingService.constant';
import { RepairingServiceService } from './repairingService.service';

const insertInToDB = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body;

  const result = await RepairingServiceService.insertInToDB(data);

  sendResponse<Service>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service Created successfully',
    data: result,
  });
});

const getSingleFromDB = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await RepairingServiceService.getSingleFromDB(id);

  sendResponse<Service>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service fetched successfully',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, serviceFilterableFields);
  const options = pick(req.query, paginationFields);

  const result = await RepairingServiceService.getAllFromDB(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Services fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const updateInToDB = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const { ...updatedData } = req.body;

  const result = await RepairingServiceService.updateInToDB(id, updatedData);

  sendResponse<Service>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service Updated successfully',
    data: result,
  });
});

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await RepairingServiceService.deleteFromDB(id);

  sendResponse<Service>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service Updated successfully',
    data: result,
  });
});

export const RepairingServiceController = {
  insertInToDB,
  getAllFromDB,
  getSingleFromDB,
  updateInToDB,
  deleteFromDB,
};
