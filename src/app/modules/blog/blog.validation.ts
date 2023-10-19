import { z } from 'zod';
import { blogStatus } from './blog.constant';

const createBlog = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    content: z.string({
      required_error: 'Content is required',
    }),
    author: z.string({
      required_error: 'Author is required',
    }),
    tags: z.array(
      z.string({
        required_error: 'Tag is required',
      }),
      {
        required_error: 'Tags are required',
      }
    ),
  }),
});

const updateBlog = z.object({
  body: z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    author: z.string().optional(),
    tags: z
      .array(
        z.string({
          required_error: 'Tag is required',
        })
      )
      .optional(),
    status: z.enum([...blogStatus] as [string, ...string[]]).optional(),
  }),
});

export const BlogValidation = {
  createBlog,
  updateBlog,
};
