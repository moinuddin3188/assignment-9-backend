"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FAQValidation = void 0;
const zod_1 = require("zod");
const createFAQ = zod_1.z.object({
    body: zod_1.z.object({
        answer: zod_1.z.string({
            required_error: 'answer is required',
        }),
        question: zod_1.z.string({
            required_error: 'question is required',
        }),
    }),
});
const updateFAQ = zod_1.z.object({
    body: zod_1.z.object({
        answer: zod_1.z.string().optional(),
        question: zod_1.z.string().optional(),
    }),
});
exports.FAQValidation = {
    createFAQ,
    updateFAQ,
};
