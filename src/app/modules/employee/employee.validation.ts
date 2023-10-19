import { z } from 'zod';
import { gender } from '../user/user.constant';

const createEmployee = z.object({
  body: z.object({
    user: z.object(
      {
        email: z.string({
          required_error: 'Email is required',
        }),
        password: z.string({
          required_error: 'password is required',
        }),
        firstName: z.string({
          required_error: 'firstName is required',
        }),
        lastName: z.string({
          required_error: 'lastName is required',
        }),
        contactNo: z.string({
          required_error: 'Contact Number is required',
        }),
        address: z.string({
          required_error: 'Address is required',
        }),
        faceBookIdLink: z.string().optional(),
        instaIdLink: z.string().optional(),
        whatsAppNumber: z.string().optional(),
        gender: z.enum([...gender] as [string, ...string[]], {
          required_error: 'Gender is required',
        }),
      },
      {
        required_error: 'User is required',
      }
    ),
    employee: z.object(
      {
        hireDate: z.string({
          required_error: 'hireDate is required',
        }),
        emergencyContactNumber: z.string({
          required_error: 'emergency Contact Number is required',
        }),
        salary: z.number({
          required_error: 'Salary is required',
        }),
        dateOfBirth: z.string().optional(),
      },
      {
        required_error: 'Employee is required',
      }
    ),
  }),
});

const updateEmployee = z.object({
  body: z.object({
    user: z
      .object({
        email: z.string().optional(),
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        contactNo: z.string().optional(),
        address: z.string().optional(),
        faceBookIdLink: z.string().optional(),
        instaIdLink: z.string().optional(),
        whatsAppNumber: z.string().optional(),
        gender: z.enum([...gender] as [string, ...string[]]).optional(),
      })
      .optional(),
    employee: z
      .object({
        hireDate: z.string().optional(),
        emergencyContactNumber: z.string().optional(),
        salary: z.number().optional(),
        dateOfBirth: z.string().optional(),
      })
      .optional(),
  }),
});

export const EmployeeValidation = {
  createEmployee,
  updateEmployee,
};
