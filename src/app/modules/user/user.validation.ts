import { z } from 'zod';
import { gender } from './user.constant';

const createUser = z.object({
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
    contactNo: z.string().optional(),
    address: z.string().optional(),
    faceBookIdLink: z.string().optional(),
    instaIdLink: z.string().optional(),
    whatsAppNumber: z.string().optional(),
    gender: z.enum([...gender] as [string, ...string[]]).optional(),
  }),
});

const updateUser = z.object({
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

export const UserValidation = {
  createUser,
  updateUser,
};
