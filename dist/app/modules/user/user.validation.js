"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const user_constant_1 = require("./user.constant");
const createUser = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: 'Email is required',
        }),
        password: zod_1.z.string({
            required_error: 'password is required',
        }),
        firstName: zod_1.z.string({
            required_error: 'firstName is required',
        }),
        lastName: zod_1.z.string({
            required_error: 'lastName is required',
        }),
        contactNo: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
        faceBookIdLink: zod_1.z.string().optional(),
        instaIdLink: zod_1.z.string().optional(),
        whatsAppNumber: zod_1.z.string().optional(),
        gender: zod_1.z.enum([...user_constant_1.gender]).optional(),
    }),
});
const updateUser = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().optional(),
        firstName: zod_1.z.string().optional(),
        lastName: zod_1.z.string().optional(),
        contactNo: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
        faceBookIdLink: zod_1.z.string().optional(),
        instaIdLink: zod_1.z.string().optional(),
        whatsAppNumber: zod_1.z.string().optional(),
        gender: zod_1.z.enum([...user_constant_1.gender]).optional(),
    }),
});
exports.UserValidation = {
    createUser,
    updateUser,
};
