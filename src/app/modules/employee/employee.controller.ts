import { Employee } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { employeeFilterableFields } from './employee.constant';
import { EmployeeService } from './employee.service';

const getSingleEmployee = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await EmployeeService.getSingleEmployee(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Employee fetched successfully',
    data: result,
  });
});

const getAllEmployees = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, employeeFilterableFields);
  const options = pick(req.query, paginationFields);

  const result = await EmployeeService.getAllEmployees(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Employees fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const updateEmployee = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const { ...updatedData } = req.body;

  const result = await EmployeeService.updateEmployee(id, updatedData);

  sendResponse<Employee>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Employee Updated successfully',
    data: result,
  });
});

const deleteEmployee = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await EmployeeService.deleteEmployee(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Employee Updated successfully',
    data: result,
  });
});

export const EmployeeController = {
  getAllEmployees,
  getSingleEmployee,
  updateEmployee,
  deleteEmployee,
};
