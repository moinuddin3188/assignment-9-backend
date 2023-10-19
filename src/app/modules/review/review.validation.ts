import { z } from 'zod';

const createReview = z.object({
  body: z.object({
    rating: z.number({
      required_error: 'Rating is required',
    }),
    content: z.string({
      required_error: 'content is required',
    }),
    userId: z.string({
      required_error: 'userId is required',
    }),
    serviceId: z.string({
      required_error: 'serviceId is required',
    }),
  }),
});

const updateReview = z.object({
  body: z.object({
    rating: z.number().optional(),
    content: z.string().optional(),
  }),
});

export const ReviewValidation = {
  createReview,
  updateReview,
};
