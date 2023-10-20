"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewValidation = void 0;
const zod_1 = require("zod");
const createReview = zod_1.z.object({
    body: zod_1.z.object({
        rating: zod_1.z.number({
            required_error: 'Rating is required',
        }),
        content: zod_1.z.string({
            required_error: 'content is required',
        }),
        userId: zod_1.z.string({
            required_error: 'userId is required',
        }),
        serviceId: zod_1.z.string({
            required_error: 'serviceId is required',
        }),
    }),
});
const updateReview = zod_1.z.object({
    body: zod_1.z.object({
        rating: zod_1.z.number().optional(),
        content: zod_1.z.string().optional(),
    }),
});
exports.ReviewValidation = {
    createReview,
    updateReview,
};
