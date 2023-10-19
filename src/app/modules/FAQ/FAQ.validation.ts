import { z } from 'zod';

const createFAQ = z.object({
  body: z.object({
    answer: z.string({
      required_error: 'answer is required',
    }),
    question: z.string({
      required_error: 'question is required',
    }),
  }),
});

const updateFAQ = z.object({
  body: z.object({
    answer: z.string().optional(),
    question: z.string().optional(),
  }),
});

export const FAQValidation = {
  createFAQ,
  updateFAQ,
};
