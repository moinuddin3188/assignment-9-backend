"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogValidation = void 0;
const zod_1 = require("zod");
const blog_constant_1 = require("./blog.constant");
const createBlog = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'Title is required',
        }),
        content: zod_1.z.string({
            required_error: 'Content is required',
        }),
        author: zod_1.z.string({
            required_error: 'Author is required',
        }),
        tags: zod_1.z.array(zod_1.z.string({
            required_error: 'Tag is required',
        }), {
            required_error: 'Tags are required',
        }),
    }),
});
const updateBlog = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        content: zod_1.z.string().optional(),
        author: zod_1.z.string().optional(),
        tags: zod_1.z
            .array(zod_1.z.string({
            required_error: 'Tag is required',
        }))
            .optional(),
        status: zod_1.z.enum([...blog_constant_1.blogStatus]).optional(),
    }),
});
exports.BlogValidation = {
    createBlog,
    updateBlog,
};
