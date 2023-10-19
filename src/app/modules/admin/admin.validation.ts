import { z } from 'zod';
import { gender } from '../user/user.constant';

const createAdmin = z.object({
  body: z.object({
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
  }),
});

const updateAdmin = z.object({
  body: z.object({
    email: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    contactNo: z.string().optional(),
    address: z.string().optional(),
    faceBookIdLink: z.string().optional(),
    instaIdLink: z.string().optional(),
    whatsAppNumber: z.string().optional(),
    gender: z.enum([...gender] as [string, ...string[]]).optional(),
  }),
});

export const AdminValidation = {
  createAdmin,
  updateAdmin,
};
