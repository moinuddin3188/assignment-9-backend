import { z } from 'zod';

const createBlogComment = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    email: z.string({
      required_error: 'Email is required',
    }),
    comment: z.string({
      required_error: 'Title is required',
    }),
    blogId: z.string({
      required_error: 'Blog ID is required',
    }),
  }),
});

const updateBlogComment = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    comment: z.string().optional(),
  }),
});

export const BlogCommentValidation = {
  createBlogComment,
  updateBlogComment,
};
