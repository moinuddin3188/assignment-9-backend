import { z } from 'zod';
import { serviceStatus } from './repairingService.constant';

const createRepairingService = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is required',
    }),
    description: z.string({
      required_error: 'description is required',
    }),
    price: z.number({
      required_error: 'price is required',
    }),
    tags: z.array(
      z.string({
        required_error: 'Tag is required',
      }),
      {
        required_error: 'Tags are required',
      }
    ),
    status: z.enum([...serviceStatus] as [string, ...string[]]).optional(),
  }),
});

const updateRepairingService = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    price: z.number().optional(),
    tags: z
      .array(
        z.string({
          required_error: 'Tag is required',
        })
      )
      .optional(),
    status: z.enum([...serviceStatus] as [string, ...string[]]).optional(),
  }),
});

export const ServiceValidation = {
  createRepairingService,
  updateRepairingService,
};
